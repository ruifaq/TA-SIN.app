import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { SiswaComponent } from '../siswa.component'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  public dataSiswaForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeleteComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

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

    this.dataSiswaForm.patchValue(this.data)
  }

  hapusDataSiswa() {
    this.api.hapusDataSiswa(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Siswa');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }
}
