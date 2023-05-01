import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { KelasModule } from './kelas.module';
import { ToastrService } from 'ngx-toastr';
import { AddkelasComponent } from './addkelas/addkelas.component';
import { EditkelasComponent } from './editkelas/editkelas.component';
import { DeletekelasComponent } from './deletekelas/deletekelas.component';

@Component({
  selector: 'app-kelas',
  templateUrl: './kelas.component.html',
  styleUrls: ['./kelas.component.css']
})
export class KelasComponent {
  public dataKelas !: MatTableDataSource<KelasModule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['no', 'kelas', 'jumlah_siswa', 'wali_kelas', 'ta', 'action'];

  formValue !: FormGroup;
  kelasModuleObj: KelasModule = new KelasModule();
  public kelass !: any;

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  add() {
    this._dialog.open(AddkelasComponent)
  }
  edit(data: any) {
    this._dialog.open(EditkelasComponent, { data });
  }
  delete(data: any) {

    this._dialog.open(DeletekelasComponent, { data })
  }

  ngOnInit(): void {

    this.getDataKelas(); //untuk menampilkan wajib input ini

  }

  getDataKelas() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataKelas()
      .subscribe(res => {
        this.kelass = res;
        console.log();
        this.dataKelas = new MatTableDataSource(this.kelass);
        this.dataKelas.paginator = this.paginator;
        this.dataKelas.sort = this.sort;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Jika filterValue berupa kelas, filter berdasarkan kelas
    if (['1', '2', '3', '4', '5', '6'].includes(filterValue)) {
      this.dataKelas.filterPredicate = (data, filter) =>
        data.kelas.toLowerCase().includes(filter);
      this.dataKelas.filter = filterValue;
    }
    // Jika filterValue berupa siswa, filter berdasarkan nama atau nis
    else {
      this.dataKelas.filterPredicate = (data, filter) =>
        data.kelas.toLowerCase().includes(filter) || data.wali_kelas.toLowerCase().includes(filter);
      this.dataKelas.filter = filterValue;
    }
  
    if (this.dataKelas.paginator) {
      this.dataKelas.paginator.firstPage();
    }
  }

}
