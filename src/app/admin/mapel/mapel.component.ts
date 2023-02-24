import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { MapelModule } from './mapel.module'; 
import { ToastrService } from 'ngx-toastr';
import { AddmapelComponent } from './addmapel/addmapel.component'; 
import { EditkelasComponent } from '../kelas/editkelas/editkelas.component'; 
import { DeletemapelComponent } from './deletemapel/deletemapel.component'; 
import { EditmapelComponent } from './editmapel/editmapel.component';

@Component({
  selector: 'app-mapel',
  templateUrl: './mapel.component.html',
  styleUrls: ['./mapel.component.css']
})
export class MapelComponent {
  public dataMapel !: MatTableDataSource<MapelModule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'mapel', 'kkm', 'kelas', 'tema', 'sub_tema', 'action'];

  formValue !: FormGroup;
  mapelModuleObj: MapelModule = new MapelModule();
  public mapels !: any;

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  add() {
    this._dialog.open(AddmapelComponent)
  }
  edit(data: any) {
    this._dialog.open(EditmapelComponent, { data });
  }
  delete(data: any) {

    this._dialog.open(DeletemapelComponent, { data })
  }

  ngOnInit(): void {

     this.getDataMapel();//untuk menampilkan wajib input ini

  }

  getDataMapel() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataMapel()
      .subscribe(res => {
        this.mapels = res;
        console.log();
        this.dataMapel = new MatTableDataSource(this.mapels);
        this.dataMapel.paginator = this.paginator;
        this.dataMapel.sort = this.sort;

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
