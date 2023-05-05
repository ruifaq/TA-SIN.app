import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editnilai',
  templateUrl: './editnilai.component.html',
  styleUrls: ['./editnilai.component.css']
})
export class EditnilaiComponent {

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
  masterData: any[] = [];

  public dataNilaiForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogref: MatDialogRef<EditnilaiComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) {
  }

  ngOnInit(): void {
    this.dataNilaiForm = this._formBuilder.group({
      nis: new FormControl(),
      nama: new FormControl(),
      nilai: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^[0-9]*$/)]),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl(),
      token: new FormControl(),
    })

    this.dataNilaiForm.patchValue(this.data);
    this.getMapel();
    this.getTema();
    this.getSiswa();
    this.getKKM();
    this.initFromMapel();
    this.initFromTema();
    this.initFromSiswa();
  }

  initFromMapel() {
    this.mapel = this.masterData.map((item: { mapel: any }) => ({ mapel: item.mapel }));
    this.mapel = this.masterData.map((item: { tema: any }) => ({ mapel: item.tema }));
    this.filterMapel();

    const mapelForm = this.dataNilaiForm.get('mapel');
    if (mapelForm) {
      mapelForm.valueChanges.subscribe(res => {

        this.filterM(res);
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

  initFromSiswa() {
    this.siswa = this.masterData.map((item: { nis: any }) => ({ siswa: item.nis }));
    this.siswa = this.masterData.map((item: { nama: any }) => ({ siswa: item.nama }));
    this.filterSiswa();

    const siswaForm = this.dataNilaiForm.get('nis');
    if (siswaForm) {
      siswaForm.valueChanges.subscribe(res => {

        this.filterS(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.siswa) {
        siswaForm.patchValue(this.data.siswa);
      }
    }

    const siswaNamaForm = this.dataNilaiForm.get('nama');
    if (siswaNamaForm) {
      siswaNamaForm.valueChanges.subscribe(res => {

        this.filterS(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.siswa) {
        siswaNamaForm.patchValue(this.data.siswa);
      }
    }
  }

  //FILTER DATA SEARCHING
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

  filterS(enterData: any) {
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

  //FILTER DATA DUPLICATE
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
    // console.log(this.unikMapel);
  }

  filterSiswa() {
    this.unikNis = Array.from(new Set(this.siswa.map((item: { nis: string; }) => item.nis)));
    this.unikNama = Array.from(new Set(this.siswa.map((item: { nama: string; }) => item.nama)));
    // console.log(this.unikNis);
    // console.log(this.unikNama);
  }

  filterTema() {
    this.unikTema = Array.from(new Set(this.tema.map((item: { tema: string; }) => item.tema)));
    this.unikSubTema = Array.from(new Set(this.tema.map((item: { sub_tema: string; }) => item.sub_tema)));
  }

  getSiswa() {
    this.api.ambilDataSiswa().subscribe(res => {
      this.siswa = res;

    })
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      this.filterMapel();
      this.filterSiswa();
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

  submit() {
    // Validasi form
    if (this.dataNilaiForm.invalid) {
        // Tampilkan pesan kesalahan
        this.toastr.error('Gagal Menambah Data!!!', 'Data Nilai');
        return;
    }

   this.simpan(); // Lakukan simpan data
}

  

simpan() {
  const nilai = this.dataNilaiForm?.get('nilai')?.value ?? 0;
  const kkm = this.kkm.find((item: { kkm: any; }) => item.kkm === this.dataNilaiForm.get('kkm')?.value)?.kkm ?? 65;

  if (kkm !== 0 && nilai < kkm) {
    this.toastr.error(`Nilai yang dimasukkan (${nilai}) kurang dari KKM (${kkm})`, 'Masuk Kategori Remidial');
    this.api.ubahDataNilai(this.data.id, this.dataNilaiForm.value)
    .subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Nilai');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    })
    return;
  } else {
    this.api.ubahDataNilai(this.data.id, this.dataNilaiForm.value)
    .subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data Nilai');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    })
  }
}

}
