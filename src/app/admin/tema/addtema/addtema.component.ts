import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { TemaModule } from '../tema.module';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addtema',
  templateUrl: './addtema.component.html',
  styleUrls: ['./addtema.component.css']
})
export class AddtemaComponent {

  selectedMapel: string = '';
  temaModuleObj: TemaModule = new TemaModule;
  public dataTemaForm!: FormGroup;
  public mapel !: any;
  public tema !: any;
  public sub_tema !: any;
  unikMapel: any[] = [];
  unikTema: any[] = [];

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddtemaComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.dataTemaForm = this._formBuilder.group({
      mapel: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
    })
    this.initFromMapel();
    this.initFromTema();
    this.getMapel();
    this.getTema();
  
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      this.filterMapel();
      
    })
  }

  getTema(){
    this.api.ambilDataTema().subscribe(res => {
      this.tema = res;
      this.filterTema();
    })
  }

  initFromMapel() {
    this.mapel = this._formBuilder.group({
      'mapel': [''],
    })
    this.dataTemaForm.get('mapel')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      // this.filterM(res)
    })
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

  // //FILTER SEARCHING MAPEL
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

  //FILTER DUPLICATE MAPEL
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
  }

  filterTema() {
    this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
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
