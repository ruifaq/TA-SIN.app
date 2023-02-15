import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editGuruForm: FormGroup;

  status: string[] = [
    'Aktif',
    'Non Aktif'
  ];

  constructor(private _fb: FormBuilder, public dialogref:MatDialogRef<EditComponent>) {
    this.editGuruForm = this._fb.group({
      nip: '198503302003121002',
      nama: 'Wulan S.Pd',
      username: 'wulan',
      password: '123',
      alamat: 'Yogyakarta',
      jabatan: 'Wali Kelas',
      hp: '09123456789',
      status: 'Aktif'
    })
  }

  simpan(){
    if (this.editGuruForm.valid) {
      console.log(this.editGuruForm.value);
      this.dialogref.close();
    }
  }
}
