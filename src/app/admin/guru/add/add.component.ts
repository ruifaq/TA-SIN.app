import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  addGuruForm: FormGroup;

  status: string[] = [
    'Aktif',
    'Non Aktif'
  ];

  constructor(private _fb: FormBuilder) {
    this.addGuruForm = this._fb.group({
      nip: '',
      nama: '',
      username: '',
      password: '',
      alamat: '',
      jabatan: '',
      hp: '',
      status: ''
    })
  }

  simpan(){
    if (this.addGuruForm.valid) {
      console.log(this.addGuruForm.value);
    }
  }

}