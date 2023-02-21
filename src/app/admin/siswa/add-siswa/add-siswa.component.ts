import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { SiswaModule } from '../siswa.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-siswa',
  templateUrl: './add-siswa.component.html',
  styleUrls: ['./add-siswa.component.css']
})
export class AddSiswaComponent {

  siswaModuleObj: SiswaModule = new SiswaModule;
  public dataSiswaForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddSiswaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public kelas: any
  ) {
  }

  ngOnInit(): void {
    this.dataSiswaForm = this._formBuilder.group({
      nis: ["", Validators.required],
      nama: ["", Validators.required],
      alamat: ["", Validators.required],
      hp: ["", Validators.required],
      kelas: ["", Validators.required],
      ta: ["", Validators.required],

    })

    this.getKelas();
  }

  getKelas(){
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }

  simpan() {
    this.api.tambahDataSiswa(this.dataSiswaForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Siswa');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }
}
