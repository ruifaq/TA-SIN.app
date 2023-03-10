import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru.module';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {


  guruModuleObj: GuruModule = new GuruModule;

  public dataGuruForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
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
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Siswa');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }



}