import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

export interface PeriodicElement {
  nip: string;
  position: number;
  nama: string;
  username: string;
  pass:string;
  alamat:string;
  jabatan:string;
  hp:string;
  status:string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
//   {position: 2, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
//   {position: 3, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
//   {position: 4, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
//   {position: 5, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},

// ];

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-guru',
  templateUrl: './guru.component.html',
  styleUrls: ['./guru.component.css']
})
export class GuruComponent {

  addGuruArr: any[] = [];
  guru: any = {
    nip: '',
    nama: '',
    username: '',
    password: '',
    alamat: '',
    jabatan: '',
    hp: '',
    status: ''
  };

  displayedColumns: string[] = ['position', 'nip', 'nama', 'username', 'pass', 'alamat', 'jabatan', 'hp', 'status', 'action'];
  // dataSource = ELEMENT_DATA;

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // matcher = new MyErrorStateMatcher();

  constructor(private _dialog: MatDialog){}

 

  add(){
    this._dialog.open(AddComponent)
  }
  edit(){
    this._dialog.open(EditComponent)
  }
  delete(){
    this._dialog.open(DeleteComponent)
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('guru');
    if(localData != null){
      this.addGuruArr = JSON.parse(localData)
    }
  }

}
