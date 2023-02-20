import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { KelasModule } from '../kelas.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addkelas',
  templateUrl: './addkelas.component.html',
  styleUrls: ['./addkelas.component.css']
})
export class AddkelasComponent {

  kelasModuleObj: KelasModule = new KelasModule;

  public dataKelasForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddkelasComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.dataKelasForm = this._formBuilder.group({
      kelas: ["", Validators.required],
      jumlah_siswa: ["", Validators.required],
      wali_kelas: ["", Validators.required],
      ta: ["", Validators.required],
    })
  }

  simpan() {
    this.api.tambahDataKelas(this.dataKelasForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Kelas');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }

}
