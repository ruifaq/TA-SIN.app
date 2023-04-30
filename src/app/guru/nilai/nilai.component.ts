import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { NilaiModule } from './nilai.module';
import { ToastrService } from 'ngx-toastr';
import { AddnilaiComponent } from './addnilai/addnilai.component';
import { EditnilaiComponent } from './editnilai/editnilai.component';
import { DeletenilaiComponent } from './deletenilai/deletenilai.component';
import { jsPDF } from 'jspdf';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX from 'xlsx';
import { v4 as  uuidv4 } from 'uuid';


@Component({
  selector: 'app-nilai',
  templateUrl: './nilai.component.html',
  styleUrls: ['./nilai.component.css']
})
export class NilaiComponent {

  public dataNilai !: MatTableDataSource<NilaiModule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tabel', { static: false }) el!: ElementRef;

  displayedColumns: string[] = ['no', 'nis', 'nama', 'nilai', 'mapel', 'tema', 'sub_tema', 'action'];

  formValue !: FormGroup;
  nilaiModuleObj: NilaiModule = new NilaiModule();
  public nilais !: any;
  public  uid!: any;

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  add() {
    this._dialog.open(AddnilaiComponent);
  }
  edit(data: any) {
    this._dialog.open(EditnilaiComponent, { data });
  }
  delete(data: any) {

    this._dialog.open(DeletenilaiComponent, { data })
  }

  cetak() {
    let pdf = new jsPDF('l', 'pt', 'a4');
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
      title: 'Nilai',
      useBom: true,
      headers: ["NIS", " Nama", "Nilai", "Mapel", "Tema", "Sub Tema", "Total Nilai", "Rata-Rata"]
    };
 
    new ngxCsv(this.nilais, "nilai", options);
  }

  excel() {
    let element = document.getElementById('nilai');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    XLSX.writeFile(wb, 'Nilai Rata-Rata Per Tema.xlsx');

  }

  ngOnInit(): void {

    this.getDataNilai(); //untuk menampilkan wajib input ini

  }

  getDataNilai() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataNilai()
      .subscribe(res => {
        this.nilais = res;
        console.log();
        this.dataNilai = new MatTableDataSource(this.nilais);
        this.dataNilai.paginator = this.paginator;
        this.dataNilai.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataNilai.filter = filterValue.trim().toLowerCase();

    if (this.dataNilai.paginator) {
      this.dataNilai.paginator.firstPage();
    }
  }


}
