import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { NilaiModule } from '../nilai.module';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-addnilai',
  templateUrl: './addnilai.component.html',
  styleUrls: ['./addnilai.component.css']
})
export class AddnilaiComponent {

  nilaiModuleObj: NilaiModule = new NilaiModule;
  public mapel !: any;
  public siswa !: any;
  public uid!: any;

  public dataNilaiForm!: FormGroup;
 filterNis!: Observable<any[]>;
 

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddnilaiComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataNilaiForm = this._formBuilder.group({
      nis: ["", Validators.required],
      nama: ["", Validators.required],
      nilai: ["", Validators.required],
      mapel: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
      token: [crypto.randomUUID(), Validators.required],
    })

    this.getMapel();
    this.getSiswa();
  }

  getSiswa() {
    this.api.ambilDataSiswa().subscribe(res => {
      this.siswa = res;
     
    })
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.siswa.filter = filterValue.trim().toLowerCase();
  }


  simpan() {
    this.api.tambahdataNilai(this.dataNilaiForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Menambah Data!!!', 'Data Nilai');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
  }



}
