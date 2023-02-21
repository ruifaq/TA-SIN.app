import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { TemaModule } from '../tema.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtema',
  templateUrl: './addtema.component.html',
  styleUrls: ['./addtema.component.css']
})
export class AddtemaComponent {

  temaModuleObj: TemaModule = new TemaModule;

  public dataTemaForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddtemaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.dataTemaForm = this._formBuilder.group({
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
    })
  }

  simpan() {
    this.api.tambahDataTema(this.dataTemaForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Tema');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }
}
