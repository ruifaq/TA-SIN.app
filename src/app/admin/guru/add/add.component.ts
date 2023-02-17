import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru.module';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {


  guruModuleObj: GuruModule = new GuruModule;
  status: string[] = [
    'Aktif',
    'Non Aktif'
  ];

  public dataGuruForm!: FormGroup;



  constructor(private _fb: FormBuilder, 
    public dialogref: MatDialogRef<AddComponent>, 
    private api: ApiService, 
    private _formBuilder: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.dataGuruForm = this._formBuilder.group({
      nip: ["", Validators.required],
      nama: ["", Validators.required],
      username: ["", Validators.required],
      pass: ["", Validators.required],
      alamat: ["", Validators.required],
      jabatan: ["", Validators.required],
      hp: ["", Validators.required],
      status: ["", Validators.required]

    })
  }

  simpan() {
    this.api.tambahData(this.dataGuruForm.value)
      .subscribe(res => {
        console.log(res);
        this.dialogref.close();
        window.location.reload()
      })
  }



}