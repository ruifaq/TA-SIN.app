import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  public dataMapelForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddmapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.dataMapelForm = this._formBuilder.group({
      mapel: ["", Validators.required],
      kkm: ["", Validators.required],
      kelas: ["", Validators.required],
      tema: ["", Validators.required],
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
