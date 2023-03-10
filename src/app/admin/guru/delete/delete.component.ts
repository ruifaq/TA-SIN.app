import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  public dataGuruForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeleteComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataGuruForm = new FormGroup({
      nip: new FormControl(),
      nama: new FormControl(),
      username: new FormControl(),
      pass: new FormControl(),
      alamat: new FormControl(),
      jabatan: new FormControl(),
      hp: new FormControl(),
      status: new FormControl(),

    })

    this.dataGuruForm.patchValue(this.data)
  }

  hapusDataGuru() {
    this.api.hapusDataGuru(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Guru');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }
}
