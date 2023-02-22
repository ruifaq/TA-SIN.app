import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { MapelModule } from '../mapel.module';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addmapel',
  templateUrl: './addmapel.component.html',
  styleUrls: ['./addmapel.component.css']
})
export class AddmapelComponent {
  mapelModuleObj: MapelModule = new MapelModule;
  public tema !: any;

  public dataMapelForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddmapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataMapelForm = this._formBuilder.group({
      mapel: ["", Validators.required],
      kkm: ["", Validators.required],
      kelas: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
    })

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
    this.api.tambahDataMapel(this.dataMapelForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Mata Pelajaran');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }

}
