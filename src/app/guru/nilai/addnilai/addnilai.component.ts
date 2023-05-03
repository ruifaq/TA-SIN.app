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
  public tema !: any;
  public sub_tema !: any;
  public kkm !: any;
  unikMapel: any[] = [];
  unikTema: any[] = [];
  unikSubTema: any[] = [];
  unikNis: any[] = [];
  unikNama: any[] = [];

  public dataNilaiForm!: FormGroup;
 

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
      nilai: [ , Validators.required],
      mapel: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
      token: [crypto.randomUUID(), Validators.required],
    })

    this.getMapel();
    this.getTema();
    this.getSiswa();
    this.getKKM();
    this.initFromMapel();
    this.initFormSiswa();
    this.initFromTema();
  }

  //MEMANGGIL DATA MAPEL
  initFromMapel() {
    this.mapel = this._formBuilder.group({
      'mapel': [''],
    })
    this.dataNilaiForm.get('mapel')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterM(res)
    })
   
  }

  //MEMANGGIL DATA SISWA
  initFormSiswa(){
    this.siswa = this._formBuilder.group({
      'siswa': [''],
    })
    this.dataNilaiForm.get('nis')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterS(res)
    })

    this.dataNilaiForm.get('nama')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterS(res)
    })
  }

  initFromTema() {
    this.tema = this._formBuilder.group({
      'tema': ['']
    })
    this.dataNilaiForm.get('tema')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterT(res)
    })
    this.tema = this._formBuilder.group({
      'sub_tema': ['']
    })
    this.dataNilaiForm.get('sub_tema')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterT(res)
    })
  }

  //FILTER SEARCHING MAPEL
  filterM(enterData: any) {
    if (!enterData) {
      // jika input kosong, tampilkan semua data
      this.filterMapel();
    } else {
      // filter data berdasarkan input
      this.unikMapel = this.unikMapel.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
    }
  }

  //FILTER SEARCHING SISWA
  filterS(enterData: any){
    if (!enterData) {
      // jika input kosong, tampilkan semua data
      this.filterSiswa();
    } else {
      // filter data berdasarkan input
      this.unikNis = this.unikNis.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })

      this.unikNama = this.unikNama.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
    }
  }

  filterT (enterData: any) {
    if (!enterData) {
      // jika input kosong, tampilkan semua data
      this.filterTema();
    } else {
      // filter data berdasarkan input
      this.unikTema = this.unikTema.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
      this.unikSubTema = this.unikSubTema.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
    }
  }

  //FILTER DUPLICATE MAPEL
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
  }

   //FILTER DUPLICATE SISWA
  filterSiswa(){
    this.unikNis = Array.from(new Set(this.siswa.map((item: { nis: string; }) => item.nis)));
    this.unikNama = Array.from(new Set(this.siswa.map((item: { nama: string; }) => item.nama)));
  }

  filterTema() {
    this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
    this.unikSubTema = Array.from(new Set(this.tema.map((item: { sub_tema: string; }) => item.sub_tema)));
  }

  getSiswa() {
    this.api.ambilDataSiswa().subscribe(res => {
      this.siswa = res;
      this.filterSiswa();
    })
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

  getKKM() {
    this.api.ambilDataKkm().subscribe(res => {
      this.kkm = res;
      console.log(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.siswa.filter = filterValue.trim().toLowerCase();
  }


  simpan() {
    const nilai = this.dataNilaiForm?.get('nilai')?.value ?? 0;
    const kkm = this.kkm.find((item: { kkm: any; }) => item.kkm === this.dataNilaiForm.get('kkm')?.value)?.kkm ?? 65;

    if (kkm !== 0 && nilai < kkm) {
      this.toastr.error(`Nilai yang dimasukkan (${nilai}) kurang dari KKM (${kkm})`, 'Masuk Kategori Remidial');
      this.api.tambahdataNilai(this.dataNilaiForm.value)
      .subscribe(res => {
        this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Nilai');
        this.dialogref.close();
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
      return;
    } else {
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
}
