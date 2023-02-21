import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edittema',
  templateUrl: './edittema.component.html',
  styleUrls: ['./edittema.component.css']
})
export class EdittemaComponent {

  public dataTemaForm!: FormGroup;

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EdittemaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataTemaForm = new FormGroup({
      tema: new FormControl(),
      sub_tema: new FormControl(),
   
    })

    this.dataTemaForm.patchValue(this.data);
  }

  simpan() {

    this.api.ubahDataTema(this.data.id, this.dataTemaForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Tema');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
