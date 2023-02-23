import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editnilai',
  templateUrl: './editnilai.component.html',
  styleUrls: ['./editnilai.component.css']
})
export class EditnilaiComponent {

  public mapel !: any;
  public siswa !: any;

  public dataNilaiForm!: FormGroup;


  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<EditnilaiComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataNilaiForm = this._formBuilder.group({
      nis: new FormControl(),
      nama: new FormControl(),
      nilai: new FormControl(),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl()
    })

    this.dataNilaiForm.patchValue(this.data);

    this.getMapel();
    this.getSiswa();
  }

  getSiswa() {
    this.api.ambilDataSiswa().subscribe(res => {
      this.siswa = res;
     
    })
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
    })
  }

  simpan() {
    this.api.ubahDataNilai(this.data.id, this.dataNilaiForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Nilai');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }

}
