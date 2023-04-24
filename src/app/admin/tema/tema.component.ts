import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { TemaModule } from './tema.module'; 
import { ToastrService } from 'ngx-toastr';
import { AddtemaComponent } from './addtema/addtema.component'; 
import { EditkelasComponent } from '../kelas/editkelas/editkelas.component'; 
import { DeletetemaComponent } from './deletetema/deletetema.component'; 
import { EdittemaComponent } from './edittema/edittema.component';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent {

  public dataTema !: MatTableDataSource<TemaModule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = ['no', 'mapel', 'tema', 'sub_tema', 'action'];

  formValue !: FormGroup;
  temaModuleObj: TemaModule = new TemaModule();
  public temas !: any;

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  add() {
    this._dialog.open(AddtemaComponent)
  }
  edit(data: any) {
    this._dialog.open(EdittemaComponent, { data });
  }
  delete(data: any) {

    this._dialog.open(DeletetemaComponent, { data })
  }

  ngOnInit(): void {

    this.getDataTema();//untuk menampilkan wajib input ini

 }

 getDataTema() { //untuk ambil data bisa dibuat kek gini
   this.api.ambilDataTema()
     .subscribe(res => {
       this.temas = res;
       console.log();
       this.dataTema = new MatTableDataSource(this.temas);
       this.dataTema.paginator = this.paginator;
       this.dataTema.sort = this.sort;

     })
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataTema.filter = filterValue.trim().toLowerCase();

   if (this.dataTema.paginator) {
     this.dataTema.paginator.firstPage();
   }
 }

}
