import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { KkmComponent } from '../kkm.component';
import { ToastrService } from 'ngx-toastr';
import { KkmModule } from '../kkm.module';


@Component({
  selector: 'app-addkkm',
  templateUrl: './addkkm.component.html',
  styleUrls: ['./addkkm.component.css']
})
export class AddkkmComponent {

  mapelKkmeObj: KkmModule = new KkmModule;
  public tema !: any;
  public sub_tema !: any;
  public mapel !: any;
  unikMapel: any[] = [];
  unikTema: any[] = [];
  unikSubTema: any[] = [];

  public dataKkmForm!: FormGroup;
  mapelFormControl = new FormControl();

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddkkmComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any,


  ) {
  }

  ngOnInit(): void {
    this.dataKkmForm = this._formBuilder.group({
      kelas: ["", Validators.required],
      mapel: ["", Validators.required],
      tema: ["", Validators.required],
      sub_tema: ["", Validators.required],
      kkm: ["", [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^-?(0|[1-9]\d*)(\.\d+)?$/)]],
    })

    this.getMapel();
    this.getTema();
    this.initFromTema();
    this.getKelas();
    this.initFromMapel();

  }

  //BAGIAN MEMANGGIL DATA MAPEL
  initFromMapel() {
    this.mapel = this._formBuilder.group({
      'mapel': [''],
    })
    this.dataKkmForm.get('mapel')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterM(res)
    })
   
  }

  initFromTema() {
    this.tema = this._formBuilder.group({
      'tema': ['']
    })
    this.dataKkmForm.get('tema')?.valueChanges.subscribe(res => {
      console.log('data is', res)
      this.filterT(res)
    })
    this.tema = this._formBuilder.group({
      'sub_tema': ['']
    })
    this.dataKkmForm.get('sub_tema')?.valueChanges.subscribe(res => {
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

   //FILTER SEARCHING MAPEL
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
  }

  filterTema() {
    this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
    this.unikSubTema = Array.from(new Set(this.tema.map((item: { sub_tema: string; }) => item.sub_tema)));
  }

  //BAGIAN GET, POST
  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      this.filterMapel();
   
    })
  }

  getKelas() {
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;

    })
  }

  getTema() {
    this.api.ambilDataTema().subscribe(res => {
      this.tema = res;
      this.filterTema();
    })
  }

  submit() {
    // Validasi form
    if (this.dataKkmForm.invalid) {
      // Tampilkan pesan kesalahan
      this.toastr.error('Gagal Menambah Data!!!', 'Data KKM');
      return;
    }

    const newData = this.dataKkmForm.value;
    const temaInput = newData.tema;
    const subTemaInput = newData.sub_tema;
    this.api.getKkmId(temaInput)
      .subscribe(existingData => {
        const isExisting = existingData.some(data => {
          const temaData = data.tema;
          const subTemaData = data.sub_tema;
          return encodeURIComponent(temaData) === encodeURIComponent(temaInput) && 
          encodeURIComponent(subTemaData) === encodeURIComponent(subTemaInput);
        });
        if (isExisting) {
          // Mata Pelajaran dengan Tema yang sama sudah ada, tampilkan pesan kesalahan
          this.toastr.error('KKM pada Mata Pelajaran sudah ada. Data tidak dapat ditambahkan.', 'Data KKM');
        } else {
          // Mata Pelajaran dengan Tema yang sama belum ada, lakukan simpan data
          this.api.tambahDataKkm(newData)
            .subscribe(res => {
              this.toastr.success('Berhasil Menambah Data!!!', 'Data KKM');
              this.dialogref.close();
              setTimeout(() => {
                window.location.reload();
              }, 5500);
            });
        }
      }, error => {
        console.log(error);
      });
  }

  // simpan() {
  //   this.api.tambahDataKkm(this.dataKkmForm.value)
  //     .subscribe(res => {
  //       this.toastr.success('Berhasil Menambah Data!!!', 'Data KKM');
  //       this.dialogref.close();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5500);
  //     })
  // }

}
