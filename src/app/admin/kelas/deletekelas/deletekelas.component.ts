import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { KelasModule } from '../kelas.module'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletekelas',
  templateUrl: './deletekelas.component.html',
  styleUrls: ['./deletekelas.component.css']
})
export class DeletekelasComponent {

  public dataKelasForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeletekelasComponent>,
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

    this.dataKelasForm.patchValue(this.data)
  }

  hapusDataKelas() {
    this.api.hapusDataKelas(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Kelas');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }

}
