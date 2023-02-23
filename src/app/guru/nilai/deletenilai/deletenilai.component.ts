import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { NilaiModule } from '../nilai.module'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletenilai',
  templateUrl: './deletenilai.component.html',
  styleUrls: ['./deletenilai.component.css']
})
export class DeletenilaiComponent {

  public dataNilaiForm!: FormGroup;

  myimage: string = "assets/images/icon-delete.png";

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<DeletenilaiComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataNilaiForm = new FormGroup({
      nis: new FormControl(),
      nama: new FormControl(),
      nilai: new FormControl(),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl()

    })

    this.dataNilaiForm.patchValue(this.data)
  }

  hapusDataNilai() {
    this.api.hapusDataNilai(this.data.id).subscribe(res => {
      this.toastr.success('Berhasil Menghapus Data!!!', 'Data Nilai');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
    })
  }

}
