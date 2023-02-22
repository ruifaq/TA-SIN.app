import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { KkmModule } from './kkm.module';
import { ToastrService } from 'ngx-toastr';
import { MapelModule } from 'src/app/admin/mapel/mapel.module';
import { TemaModule } from 'src/app/admin/tema/tema.module';


@Component({
  selector: 'app-kkm',
  templateUrl: './kkm.component.html',
  styleUrls: ['./kkm.component.css']
})
export class KkmComponent {

  public dataMapel !: MatTableDataSource<MapelModule>;
  public dataTema !: MatTableDataSource<TemaModule>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['mapel', 'kkm', 'kelas', 'tema', 'sub_tema', 'action'];

  formValue !: FormGroup;
  kkmModuleObj: KkmModule = new KkmModule();
  public kkms !: any;

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  add() {

  }
  edit(data: any) {

  }
  delete(data: any) {


  }

  ngOnInit(): void {

this.getDataMapel()
    this.getDataTema();
  }

  getDataMapel() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataMapel()
      .subscribe(res => {
        this.kkms = res;
        console.log();
        this.dataMapel = new MatTableDataSource(this.kkms);
        this.dataMapel.paginator = this.paginator;
        this.dataMapel.sort = this.sort;

      })
  }

  getDataTema() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataTema()
      .subscribe(res => {
        this.kkms = res;
        console.log();
        this.dataTema = new MatTableDataSource(this.kkms);
        this.dataTema.paginator = this.paginator;
        this.dataTema.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataMapel.filter = filterValue.trim().toLowerCase();

    if (this.dataMapel.paginator) {
      this.dataMapel.paginator.firstPage();
    }
  }

}
