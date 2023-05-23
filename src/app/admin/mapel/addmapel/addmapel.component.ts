import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { MapelModule } from '../mapel.module';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addmapel',
  templateUrl: './addmapel.component.html',
  styleUrls: ['./addmapel.component.css']
})
export class AddmapelComponent {
  
  mapelModuleObj: MapelModule = new MapelModule;
  public tema !: any;
  unikTema: any[] = [];
  unikSubTema: any[] = [];

  public dataMapelForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<AddmapelComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataMapelForm = this._formBuilder.group({
      mapel: ["", Validators.required],
      // kkm: ["", Validators.required],
      // kelas: ["", Validators.required],
      // tema: ["", Validators.required],
      // sub_tema: ["", Validators.required],
    })

    // this.getTema();
    // this.getsubTema();
    this.getKelas();
    // this.initFromTema();
    // this.initFromSubTema();
  }

  // getTema() {
  //   this.api.ambilDataTema().subscribe(res => {
  //     this.tema = res;
  //     this.filterTema();
  //   })
  // }

  // getsubTema() {
  //   this.api.ambilDataTema().subscribe(res => {
  //     this.tema = res;
  //     this.filterSubTema();
  //   })
  // }

  getKelas(){
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
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

  // initFromSubTema() {
  //   this.tema = this._formBuilder.group({
  //     'sub_tema': ['']
  //   })
  //   this.dataMapelForm.get('sub_tema')?.valueChanges.subscribe(res => {
  //     console.log('data is', res)
  //     this.filterT(res)
  //   })
  // }

  // filterTema() {
  //   this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
  // }

  // filterSubTema() {
  //   this.unikSubTema = Array.from(new Set(this.tema.map((item: { sub_tema: string; }) => item.sub_tema)));
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

  // filterST (enterData: any) {
  //   if (!enterData) {
  //     // jika input kosong, tampilkan semua data
  //     this.filterSubTema();
  //   } else {
  //     // filter data berdasarkan input
  //     this.unikSubTema = this.unikSubTema.filter((item: string) => {
  //       return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
  //     })
  //   }
  // }

  submit() {
    // Validasi form
    if (this.dataMapelForm.invalid) {
        // Tampilkan pesan kesalahan
        this.toastr.error('Gagal Menambah Data!!!', 'Data Mata Pelajaran');
        return;
    }

    const newData = this.dataMapelForm.value;
    const mapelInput = newData.mapel.toUpperCase(); // Ubah input menjadi lowercase
    this.api.getMapelId(mapelInput)
      .subscribe(existingData => {
        if (existingData.length > 0) {
          // Mata Pelajaran sudah ada, tampilkan pesan kesalahan
          this.toastr.error('Mata Pelajaran sudah ada. Data tidak dapat ditambahkan.', 'Data Mata Pelajaran');
        } else {
          // Mata Pelajaran belum ada, lakukan simpan data
          this.api.tambahDataMapel(newData)
            .subscribe(res => {
              this.toastr.success('Berhasil Menambah Data!!!', 'Data Mata Pelajaran');
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
  //   this.api.tambahDataMapel(this.dataMapelForm.value)
  //     .subscribe(res => {
  //       this.toastr.success('Berhasil Menambah Data!!!', 'Data Mata Pelajaran');
  //       this.dialogref.close();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5500);
  //     })
  // }
}
