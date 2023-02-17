import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru.module';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']

})

export class EditComponent {


  public dataGuruForm!: FormGroup;


  status: string[] = [
    'Aktif',
    'Non Aktif'
  ];

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,

    @Inject(MAT_DIALOG_DATA) public data: any



  ) { }

  ngOnInit(): void {
    this.dataGuruForm = new FormGroup({
      nip: new FormControl(),
      nama: new FormControl(),
      username: new FormControl(),
      pass: new FormControl(),
      alamat: new FormControl(),
      jabatan: new FormControl(),
      hp: new FormControl(),
      status: new FormControl(),

    })

    this.dataGuruForm.patchValue(this.data)
  }

  simpan() {
    this.api.ubahDataGuru(this.data.id, this.dataGuruForm.value).subscribe(res => {
      console.log(res);
      this.dialogref.close();
      window.location.reload()
    },
    )
  }

}
