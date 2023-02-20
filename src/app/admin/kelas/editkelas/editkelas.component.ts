import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editkelas',
  templateUrl: './editkelas.component.html',
  styleUrls: ['./editkelas.component.css']
})
export class EditkelasComponent {

  public dataKelasForm!: FormGroup;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditkelasComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any



  ) { }

  ngOnInit(): void {
    this.dataKelasForm = new FormGroup({
      kelas: new FormControl(),
      jumlah_siswa: new FormControl(),
      wali_kelas: new FormControl(),
      ta: new FormControl(),
    })

    this.dataKelasForm.patchValue(this.data);
  }

  
  simpan() {

    this.api.ubahDataKelas(this.data.id, this.dataKelasForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Kelas');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
