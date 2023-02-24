import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editkkm',
  templateUrl: './editkkm.component.html',
  styleUrls: ['./editkkm.component.css']
})
export class EditkkmComponent {

  public dataKkmForm!: FormGroup;
  public tema !: any;
  public mapel !: any;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditkkmComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) { }

  ngOnInit(): void {
    this.dataKkmForm = new FormGroup({
      kelas: new FormControl(),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl(),
      kkm: new FormControl(),

    })

    this.dataKkmForm.patchValue(this.data);
    this.getKelas();
    this.getMapel();
  }

  getKelas() {
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
    })
  }

  simpan() {

    this.api.ubahDataKkm(this.data.id, this.dataKkmForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data KKM');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
