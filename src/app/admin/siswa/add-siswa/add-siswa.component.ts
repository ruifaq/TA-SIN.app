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
      nis: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      nama: ["", Validators.required],
      alamat: ["", Validators.required],
      hp: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
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

  submit() {
    // Validasi form
    if (this.dataSiswaForm.invalid) {
      // Tampilkan pesan kesalahan
      this.toastr.error('Gagal Menambah Data!!!', 'Data Siswa');
      return;
    }
  
    const newData = this.dataSiswaForm.value;
    this.api.getSiswaNis(newData.nis)
      .subscribe(existingData => {
        if (existingData.length > 0) {
          // NIS sudah ada, tampilkan pesan kesalahan
          this.toastr.error('NIS sudah ada. Data tidak dapat ditambahkan.', 'Data Siswa');
        } else {
          // NIS belum ada, lakukan simpan data
          this.api.tambahDataSiswa(newData)
            .subscribe(res => {
              this.toastr.success('Berhasil Menambah Data!!!', 'Data Siswa');
              this.dialogref.close();
              setTimeout(() => {
                window.location.reload();
              }, 5500);
            });
        }
      }, error => {
        console.log(error);
      });
  }
  
  // simpan() {
  //   this.api.tambahDataSiswa(this.dataSiswaForm.value)
  //     .subscribe(res => {
  //       this.toastr.success('Berhasil Menambah Data!!!', 'Data Siswa');
  //       this.dialogref.close();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5500);
  //     })
  // }
}
