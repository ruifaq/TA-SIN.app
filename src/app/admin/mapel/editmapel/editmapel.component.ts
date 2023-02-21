import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editmapel',
  templateUrl: './editmapel.component.html',
  styleUrls: ['./editmapel.component.css']
})
export class EditmapelComponent {
  public dataMapelForm!: FormGroup;
  public tema !: any;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditmapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) { }

  ngOnInit(): void {
    this.dataMapelForm = new FormGroup({
      mapel: new FormControl(),
      kkm: new FormControl(),
      kelas: new FormControl(),
      tema: new FormControl(),
    })

    this.dataMapelForm.patchValue(this.data);
    this.getTema();
    this.getKelas();
  }

  getTema() {
    this.api.ambilDataTema().subscribe(res => {
      this.tema = res;
    })
  }

  getKelas(){
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }

  simpan() {

    this.api.ubahDataMapel(this.data.id, this.dataMapelForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Mata Pelajaran');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
