import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { KkmModule } from '../kkm.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletekkm',
  templateUrl: './deletekkm.component.html',
  styleUrls: ['./deletekkm.component.css']
})
export class DeletekkmComponent {

  public dataKkmForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeletekkmComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataKkmForm = new FormGroup({
      kelas: new FormControl(),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl(),
      kkm: new FormControl(),

    })

    this.dataKkmForm.patchValue(this.data)
  }

  hapusDataKkm() {
    this.api.hapusDataKkm(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data KKM');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    })
  }

}
