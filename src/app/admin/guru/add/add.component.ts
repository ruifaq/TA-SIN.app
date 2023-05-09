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
      nip: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      nama: ["", Validators.required],
      username: ["", Validators.required],
      pass: ["", Validators.required],
      alamat: ["", Validators.required],
      jabatan: ["", Validators.required],
      hp: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ["", Validators.required]

    })
  }

  submit() {
    // Validasi form
    if (this.dataGuruForm.invalid) {
        // Tampilkan pesan kesalahan
        this.toastr.error('Gagal Menambah Data!!!', 'Data Guru');
        return;
    }

   this.simpan(); // Lakukan simpan data
}

  simpan() {
    this.api.tambahData(this.dataGuruForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Guru');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }



}