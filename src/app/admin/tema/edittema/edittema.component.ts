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
  public mapel !: any;
  public siswa !: any;
  public uid!: any;
  public tema !: any;
  public sub_tema !: any;
  unikMapel: any[] = [];
  unikTema: any[] = [];
  unikSubTema: any[] = [];
  unikNis: any[] = [];
  unikNama: any[] = [];
  masterData: any[] = [];

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EdittemaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.dataTemaForm = this._formBuilder.group({
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl()
    })

    this.dataTemaForm.patchValue(this.data);
    this.getMapel();
    this.getTema();
    this.initFromMapel();
    this.initFromTema();

  }

  initFromMapel() {
    this.mapel = this.masterData.map((item: { mapel: any }) => ({ mapel: item.mapel }));
    this.mapel = this.masterData.map((item: { tema: any }) => ({ mapel: item.tema }));
    this.filterMapel();

    const mapelForm = this.dataTemaForm.get('mapel');
    if (mapelForm) {
      mapelForm.valueChanges.subscribe(res => {

        // this.filterM(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.mapel) {
        mapelForm.patchValue(this.data.mapel);
      }
    }
  }

  initFromTema() {
    this.tema = this._formBuilder.group({
      'tema': ['']
    })
    this.dataTemaForm.get('tema')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterT(res)
    })
  }

  // //FILTER DATA SEARCHING
  // filterM(enterData: any) {
  //   if (!enterData) {
  //     // jika input kosong, tampilkan semua data
  //     this.filterMapel();
  //   } else {
  //     // filter data berdasarkan input
  //     this.unikMapel = this.unikMapel.filter((item: string) => {
  //       return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
  //     })
  //   }
  // }

  filterT (enterData: any) {
    if (!enterData) {
      // jika input kosong, tampilkan semua data
      this.filterTema();
    } else {
      // filter data berdasarkan input
      this.unikTema = this.unikTema.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
    }
  }

  //FILTER DATA DUPLICATE
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
  }

  filterTema() {
    this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      this.filterMapel();
    })
  }
  getTema() {
    this.api.ambilDataTema().subscribe(res => {
      this.tema = res;
      this.filterTema();
    })
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
