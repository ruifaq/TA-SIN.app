import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']

})

export class EditComponent {


  public dataGuruForm!: FormGroup;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any



  ) { }

  ngOnInit(): void {
    this.dataGuruForm = new FormGroup({
      nip: new FormControl("", [Validators.pattern(/^[0-9]*$/)]),
      nama: new FormControl(),
      username: new FormControl(),
      pass: new FormControl(),
      alamat: new FormControl(),
      jabatan: new FormControl(),
      hp: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      status: new FormControl(),

    })

    this.dataGuruForm.patchValue(this.data);
  }

  submit() {
    // Validasi form
    if (this.dataGuruForm.invalid) {
        // Tampilkan pesan kesalahan
        this.toastr.error('Gagal Mengupdate Data!!!', 'Data Guru');
        return;
    }

   this.simpan(); // Lakukan simpan data
}

  simpan() {

    this.api.ubahDataGuru(this.data.id, this.dataGuruForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Guru');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }


}
