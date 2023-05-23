import { Component,  Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public posts: any,
  ) {
  }

  ngOnInit(): void {
    this.dataKelasForm = this._formBuilder.group({
      kelas: ["", Validators.required],
      jumlah_siswa: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      wali_kelas: ["", Validators.required],
      ta: ["", Validators.required],
    })

    this.getGuru();
  }

  getGuru() {
    this.api.ambilDataGuru().subscribe(res => {
      this.posts = res;
    })
  }

  submit() {
    // Validasi form
    if (this.dataKelasForm.invalid) {
        // Tampilkan pesan kesalahan
        this.toastr.error('Gagal Menambah Data!!!', 'Data Kelas');
        return;
    }

    const newData = this.dataKelasForm.value;
    this.api.getKelasId(newData.kelas)
      .subscribe(existingData => {
        if (existingData.length > 0) {
          // kelas sudah ada, tampilkan pesan kesalahan
          this.toastr.error('Kelas sudah ada. Data tidak dapat ditambahkan.', 'Data Kelas');
        } else {
          // kelas belum ada, lakukan simpan data
          this.api.tambahDataKelas(newData)
            .subscribe(res => {
              this.toastr.success('Berhasil Menambah Data!!!', 'Data Kelas');
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
//   this.api.tambahDataKelas(this.dataKelasForm.value)
//     .subscribe(res => {
//       this.toastr.success('Berhasil Menambah Data!!!', 'Data Kelas');
//       this.dialogref.close();
//       setTimeout(() => {
//         window.location.reload();
//       }, 5500);
//     })
// }



}
