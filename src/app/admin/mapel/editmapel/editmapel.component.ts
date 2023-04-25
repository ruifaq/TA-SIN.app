import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editmapel',
  templateUrl: './editmapel.component.html',
  styleUrls: ['./editmapel.component.css']
})
export class EditmapelComponent {
  public dataMapelForm!: FormGroup;
  public tema !: any;
  unikTema: any[] = [];

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditmapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) { }

  ngOnInit(): void {
    this.dataMapelForm = new FormGroup({
      mapel: new FormControl(),
      // kkm: new FormControl(),
      kelas: new FormControl(),
      // tema: new FormControl(),
      // sub_tema: new FormControl()
    })

    this.dataMapelForm.patchValue(this.data);
    // this.getTema();
    this.getKelas();
    // this.initFromTema();
  }

  // initFromTema() {
  //   this.tema = this._formBuilder.group({
  //     'tema': ['']
  //   })
  //   this.dataMapelForm.get('tema')?.valueChanges.subscribe(res => {
  //     console.log('data is', res)
  //     this.filterT(res)
  //   })
  // }

  // filterT (enterData: any) {
  //   if (!enterData) {
  //     // jika input kosong, tampilkan semua data
  //     this.filterTema();
  //   } else {
  //     // filter data berdasarkan input
  //     this.unikTema = this.unikTema.filter((item: string) => {
  //       return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
  //     })
  //   }
  // }

  // filterTema() {
  //   this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
  //   this.unikTema = Array.from(new Set(this.tema.map((item: { sub_tema: string; }) => item.sub_tema)));
  // }

  // getTema() {
  //   this.api.ambilDataTema().subscribe(res => {
  //     this.tema = res;
  //     this.filterTema();
  //   })
  // }

  getKelas(){
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }

  simpan() {

    this.api.ubahDataMapel(this.data.id, this.dataMapelForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Mata Pelajaran');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
