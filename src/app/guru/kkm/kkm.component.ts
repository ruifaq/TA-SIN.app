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
import { AddkkmComponent } from './addkkm/addkkm.component';
import { EditkkmComponent } from './editkkm/editkkm.component';
import { DeletekkmComponent } from './deletekkm/deletekkm.component';


@Component({
  selector: 'app-kkm',
  templateUrl: './kkm.component.html',
  styleUrls: ['./kkm.component.css']
})
export class KkmComponent {

  public dataKkm !: MatTableDataSource<KkmModule>;
  public dataTema !: MatTableDataSource<TemaModule>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'kelas', 'mapel', 'tema', 'sub_tema', 'kkm', 'action'];

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
    this._dialog.open(AddkkmComponent)
  }
  edit(data: any) {
    this._dialog.open(EditkkmComponent, {data})
  }
  delete(data: any) {
    this._dialog.open(DeletekkmComponent, {data})
  }

  ngOnInit(): void {
    this.getDataKkm();
  }

  getDataKkm() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataKkm()
      .subscribe(res => {
        this.kkms = res;
        console.log();
        this.dataKkm = new MatTableDataSource(this.kkms);
        this.dataKkm.paginator = this.paginator;
        this.dataKkm.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Jika filterValue berupa kelas, filter berdasarkan kelas
    if (['1', '2', '3', '4', '5', '6'].includes(filterValue)) {
      this.dataKkm.filterPredicate = (data, filter) =>
        data.kelas.toLowerCase().includes(filter);
      this.dataKkm.filter = filterValue;
    }
    // Jika filterValue berupa siswa, filter berdasarkan nama atau nis
    else {
      this.dataKkm.filterPredicate = (data, filter) =>
        data.mapel.toLowerCase().includes(filter) || data.mapel.toLowerCase().includes(filter);
      this.dataKkm.filter = filterValue;
    }
  
    if (this.dataKkm.paginator) {
      this.dataKkm.paginator.firstPage();
    }
  }

}
