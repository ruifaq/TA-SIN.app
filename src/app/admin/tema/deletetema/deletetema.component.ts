import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { TemaModule } from '../tema.module'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletetema',
  templateUrl: './deletetema.component.html',
  styleUrls: ['./deletetema.component.css']
})
export class DeletetemaComponent {

  public dataTemaForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeletetemaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataTemaForm = new FormGroup({
      mapel: new FormControl(),
      kkm: new FormControl(),
      kelas: new FormControl(),
      tema: new FormControl(),

    })

    this.dataTemaForm.patchValue(this.data)
  }

  hapusDataTema() {
    this.api.hapusDataTema(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Tema');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }

}
