import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  // addGuruForm: FormGroup;

  status: string[] = [
    'Aktif',
    'Non Aktif'
  ];

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

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<AddComponent>) {
    // this.addGuruForm = this._fb.group({
    //   nip: '',
    //   nama: '',
    //   username: '',
    //   password: '',
    //   alamat: '',
    //   jabatan: '',
    //   hp: '',
    //   status: ''
    // })
  }

  // simpan(){
  //   if (this.addGuruForm.valid) {
  //     console.log(this.addGuruForm.value);
  //     this.dialogref.close();
  //   }
  // }

  simpanData(data: any) {
    debugger
    this.addGuruArr.push(this.guru);
    this.dialogref.close();
    localStorage.setItem('guru', JSON.stringify(this.addGuruArr))
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('guru');
    if(localData != null){
      this.addGuruArr = JSON.parse(localData)
    }
  }

}
