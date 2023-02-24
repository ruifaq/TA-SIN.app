import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { KkmComponent } from '../kkm.component';
import { ToastrService } from 'ngx-toastr';
import { KkmModule } from '../kkm.module';

@Component({
  selector: 'app-addkkm',
  templateUrl: './addkkm.component.html',
  styleUrls: ['./addkkm.component.css']
})
export class AddkkmComponent {

  mapelKkmeObj: KkmModule = new KkmModule;
  public tema !: any;
  public mapel !: any;

  public dataKkmForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddkkmComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataKkmForm = this._formBuilder.group({
      kelas: ["", Validators.required],
      mapel: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
      kkm: ["", Validators.required],
    })

    this.getMapel();
    this.getKelas();
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      const unik = this.mapel.filter((value: any, tema: any) => {
        return this.mapel.indexOf(value) === tema;
      })
      console.log(unik);

    })
  }

  getKelas() {
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;

    })
  }

  filter() {

  }

  simpan() {
    this.api.tambahDataKkm(this.dataKkmForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data KKM');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }

}
