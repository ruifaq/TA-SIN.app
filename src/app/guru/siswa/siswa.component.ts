import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
export class SiswaComponent implements OnInit {
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


  ) {
    this.api.ambilDataSiswa().subscribe(res => {
      const data = res.slice();
      console.log('data:', data);
      this.siswas = res;
    });
    
    
  }

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

  ngOnChanges(changes: SimpleChange): void {

  }

  getDataSiswa() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataSiswa()
      .subscribe(res => {
        // console.log(res);
        this.siswas = res;
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

  sortData(event: Event ) {
    const sort = event as unknown as Sort;
    const data = this.siswas.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSiswa = data;
      return;
    }

    this.dataSiswa = data.sort((

      a: { no: string ; nis: string; nama: string; alamat: string; hp: string; kelas: string; ta: string; },
      b: { no: string ; nis: string; nama: string; alamat: string; hp: string; kelas: string; ta: string; }) => {

      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'no':
          return compare(a.no, b.no, isAsc);
        case 'nis':
          return compare(a.nis, b.nis, isAsc);
        case 'nama':
          return compare(a.nama, b.nama, isAsc);
        case 'alamat':
          return compare(a.alamat, b.alamat, isAsc);
        case 'hp':
          return compare(a.hp, b.hp, isAsc);
        case 'kelas':
          return compare(a.kelas, b.kelas, isAsc);
        case 'ta':
          return compare(a.ta, b.ta, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
