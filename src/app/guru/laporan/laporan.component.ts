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

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})


export class LaporanComponent {

  public dataLaporan !: MatTableDataSource<LaporanModule>;

  displayedColumns: string[] = ['no', 'nis', 'nama', 'tema1', 'tema2', 'tema3', 'tema4', 'tema5', 'tema6', 'tema7', 'tema8', 'tema9', 'action'];

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

    this.getDataLaporan(); //untuk menampilkan wajib input ini

  }

  getDataLaporan() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataSiswa()
      .subscribe(res => {
        this.laporans = res;
        console.log(res);
        this.dataLaporan = new MatTableDataSource(this.laporans);
        this.dataLaporan.paginator = this.paginator;
        this.dataLaporan.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLaporan.filter = filterValue.trim().toLowerCase();

    if (this.dataLaporan.paginator) {
      this.dataLaporan.paginator.firstPage();
    }
  }

  cetak() {
    let pdf = new jsPDF('l', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("nilai.pdf")
      }
    })
  }

  csv() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Laporan Nilai Rata-Rata',
      useBom: true,
      headers: ["NIS", " Nama", "Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6", "Tema 7", "Tema 8", "Tema 9"]
    };

    new ngxCsv(this.laporans, "Laporan Nilai Rata-Rata", options);
  }

  excel() {
    let element = document.getElementById('nilai');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, this.laporans)
  }

}
