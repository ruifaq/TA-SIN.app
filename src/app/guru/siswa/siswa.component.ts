import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { SiswaModule } from './siswa.module'; 
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css']
})
export class SiswaComponent implements OnInit{
  formValue !: FormGroup;
  public dataSiswa !: MatTableDataSource<SiswaModule>;
  public siswas !: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'nis', 'nama', 'alamat', 'hp', 'kelas', 'ta'];

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nis: [''],
      nama: [''],
      alamat: [''],
      hp: [''],
      kelas: [''],
      ta: [''],
    })

  this.getDataSiswa();
  }

  getDataSiswa() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataSiswa()
      .subscribe(res => {
        this.siswas = res;
        console.log();
        this.dataSiswa = new MatTableDataSource(this.siswas);
        this.dataSiswa.paginator = this.paginator;
        this.dataSiswa.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSiswa.filter = filterValue.trim().toLowerCase();

    if (this.dataSiswa.paginator) {
      this.dataSiswa.paginator.firstPage();
    }
  }
}
