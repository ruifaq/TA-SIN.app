import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { MapelModule } from '../mapel.module'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletemapel',
  templateUrl: './deletemapel.component.html',
  styleUrls: ['./deletemapel.component.css']
})
export class DeletemapelComponent {

  public dataMapelForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeletemapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataMapelForm = new FormGroup({
      mapel: new FormControl(),
      kkm: new FormControl(),
      kelas: new FormControl(),
      tema: new FormControl(),

    })

    this.dataMapelForm.patchValue(this.data)
  }

  hapusDataMapel() {
    this.api.hapusDataMapel(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Mata Pelajaran');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }

}
