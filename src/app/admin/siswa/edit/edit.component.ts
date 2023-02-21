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
  public dataSiswaForm!: FormGroup;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any



  ) { }

  ngOnInit(): void {
    this.dataSiswaForm = new FormGroup({
      nis: new FormControl(),
      nama: new FormControl(),
      alamat: new FormControl(),
      hp: new FormControl(),
      kelas: new FormControl(),
      ta: new FormControl(),
    })

    this.dataSiswaForm.patchValue(this.data);
    this.getKelas();
  }

  getKelas(){
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }
  

  simpan() {

    this.api.ubahDataSiswa(this.data.id, this.dataSiswaForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Guru');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
