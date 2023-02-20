import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { GuruModule } from './guru.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guru',
  templateUrl: './guru.component.html',
  styleUrls: ['./guru.component.css']
})
export class GuruComponent implements OnInit {
  public dataSource !: MatTableDataSource<GuruModule>;
  public gurus !: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nip', 'nama', 'username', 'pass', 'alamat', 'jabatan', 'hp', 'status', 'action'];

  formValue !: FormGroup;
  guruModuleObj: GuruModule = new GuruModule();

  constructor(
    private _dialog: MatDialog,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    
  ) {}

  add() {
    this._dialog.open(AddComponent)
  }
  edit(data: any) {
    this._dialog.open(EditComponent, { data });
  }
  delete(data: any) {

    this._dialog.open(DeleteComponent, { data })
  }


  ngOnInit(): void {

    this.getDataGuru(); //untuk menampilkan wajib input ini
  
  }

  getDataGuru() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataGuru()
      .subscribe(res => {
        this.gurus = res;
        console.log();
        this.dataSource = new MatTableDataSource(this.gurus);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hapusDataGuru(id: number) {
   
    this._dialog.open(DeleteComponent)
    this.api.hapusDataGuru(id).subscribe(res => {
      this.toastr.success('Berhasil Hapus Data')
   
    })
  }
  

}
