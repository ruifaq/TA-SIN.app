import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { LaporanModule } from './laporan.module';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})


export class LaporanComponent {

  public dataLaporan !: MatTableDataSource<LaporanModule>;

  displayedColumns: string[] = ['no', 'nis', 'nama', 'nilaiMapel1', 'nilaiMapel2', 'nilaiMapel3', 'nilaiMapel4', 'nilaiMapel5', 'nilaiMapel6', 'nilaiMapel7', 'nilaiMapel8', 'nilaiMapel9', 'total_nilai'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tabel', { static: false }) el!: ElementRef;

  formValue !: FormGroup;
  LaporanModuleObj: LaporanModule = new LaporanModule();
  public laporans !: any;
  public uid!: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {

    this.nilaiTotal(); //untuk menampilkan wajib input ini

  }

  getTemaKeysAndFilterByMapel(nilaiPerTema: any, mapel: string, dataLaporan: any[]) {
    if (!nilaiPerTema) return [];
    const filteredData = dataLaporan.filter((data) => data.nilaiPerMapel[mapel] !== undefined);
    console.log('filteredData:', filteredData);
    const temaKeys = Object.keys(nilaiPerTema);
    console.log('temaKeys:', temaKeys);
    return temaKeys.filter((tema) => filteredData.some((data) => data.nilaiPerTema[tema] !== undefined));
  }
  

  getDataLaporan() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataNilai()
      .subscribe(res => {
        this.laporans = res;
        console.log(res);
        this.dataLaporan = new MatTableDataSource(this.laporans);
        this.dataLaporan.paginator = this.paginator;
        this.dataLaporan.sort = this.sort;

      })
  }

  nilaiTotal() {
    this.api.hitungNilai().subscribe(res => {
      const temaSet = new Set();
      const mapelSet = new Set();
      res.forEach(nilai => {
        temaSet.add(nilai.tema);
        mapelSet.add(nilai.mapel.split(':')[0]); // ubah agar hanya ambil nama mapel
      });
      const temaArray = Array.from(temaSet) as string[];
      const mapelArray = Array.from(mapelSet) as string[];
      const siswaMap = new Map<string, {
        nis: string,
        nama: string,
        mapel: string,
        totalNilai: number,
        jumlahNilai: number,

        nilaiPerTema: { [tema: string]: { total: number, jumlah: number } },
        nilaiPerMapel: { [mapel: string]: { total: number, jumlah: number } }
      }>();


      // Tambahkan inisialisasi mapelMap dengan object kosong
      const mapelMap = new Map<string, {
        nama: string,
        tema: string[]
      }>();

      // Tambahkan iterasi untuk mengisi nilai mapelMap
      res.forEach(nilai => {
        const mapelKey = nilai.mapel.split(':')[0];
        const temaKey = nilai.tema;

        if (mapelMap.has(mapelKey)) {
          const mapel = mapelMap.get(mapelKey);
          if (mapel) {
            if (!mapel.tema.includes(temaKey)) {
              mapel.tema.push(temaKey);
            }
          }
        } else {
          mapelMap.set(mapelKey, {
            nama: mapelKey,
            tema: [temaKey]
          });
        }
      });

      for (const nilai of res) {
        const siswaKey = nilai.nis;
        const temaKey = nilai.tema;
        const mapelKey = nilai.mapel.split(':')[0]; // ambil nama mapel saja
        if (siswaMap.has(siswaKey)) {
          const siswa = siswaMap.get(siswaKey);
          if (siswa) {
            // console.log(`Mapel yang diambil oleh siswa dengan NIS ${siswaKey}:`);
            // Object.keys(siswa.nilaiPerMapel).forEach(mapelKey => {
            //   console.log(`- ${mapelKey}`);
            // });

            siswa.totalNilai += parseFloat(nilai.nilai.toString());
            siswa.jumlahNilai++;

            if (siswa.nilaiPerMapel[mapelKey]) {
              siswa.nilaiPerMapel[mapelKey].total += parseFloat(nilai.nilai.toString());
              siswa.nilaiPerMapel[mapelKey].jumlah++;
            } else {
              siswa.nilaiPerMapel[mapelKey] = { total: parseFloat(nilai.nilai.toString()), jumlah: 1 };
              siswa.mapel = mapelKey; // ubah nilai mapel hanya jika mapelKey belum ada
            }

            if (siswa.nilaiPerTema[temaKey]) {
              siswa.nilaiPerTema[temaKey].total += parseFloat(nilai.nilai.toString());
              siswa.nilaiPerTema[temaKey].jumlah++;
            } else {
              siswa.nilaiPerTema[temaKey] = { total: parseFloat(nilai.nilai.toString()), jumlah: 1 };
            }

          }
        } else {
          const nilaiPerTema = {} as { [tema: string]: { total: number, jumlah: number } };
          nilaiPerTema[temaKey] = { total: parseFloat(nilai.nilai.toString()), jumlah: 1 };

          const nilaiPerMapel = {} as { [mapel: string]: { total: number, jumlah: number } };
          nilaiPerMapel[mapelKey] = { total: parseFloat(nilai.nilai.toString()), jumlah: 1 };

          siswaMap.set(siswaKey, {
            nis: nilai.nis,
            nama: nilai.nama,
            mapel: mapelKey, // ubah nilai mapel
            totalNilai: parseFloat(nilai.nilai.toString()),
            jumlahNilai: 1,
            nilaiPerTema,
            nilaiPerMapel,
          });
        }
      }

      // Tambahkan penghitungan rata-rata nilai per tema dan per mapel

      siswaMap.forEach((siswa) => {
        for (const tema of temaArray) {
          if (siswa.nilaiPerTema[tema]) {
            siswa.nilaiPerTema[tema].jumlah = siswa.nilaiPerTema[tema].total / siswa.nilaiPerTema[tema].jumlah;
          }
        }
        for (const mapel of mapelArray) {
          if (siswa.nilaiPerMapel[mapel]) {
            siswa.nilaiPerMapel[mapel].jumlah = siswa.nilaiPerMapel[mapel].total / siswa.nilaiPerMapel[mapel].jumlah;
          }
        }
      });

      const siswaArray = Array.from(siswaMap.values());
      this.laporans = siswaArray;
      console.log(this.laporans)
      this.dataLaporan = new MatTableDataSource(this.laporans);
      this.dataLaporan.paginator = this.paginator;
      this.dataLaporan.sort = this.sort;
      return { siswa: siswaArray, tema: temaArray, mapel: Array.from(mapelMap.values()) };



    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLaporan.filter = filterValue.trim().toLowerCase();

    if (this.dataLaporan.paginator) {
      this.dataLaporan.paginator.firstPage();
    }
  }

  cetak() {
    let pdf = new jsPDF('l', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("nilai.pdf")
      }
    })
  }

  excel() {
    let element = document.getElementById('nilai');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, 'Nilai Rata-Rata Per Tema.xlsx');

  }

}
