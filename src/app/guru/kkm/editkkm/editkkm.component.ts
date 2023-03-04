import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editkkm',
  templateUrl: './editkkm.component.html',
  styleUrls: ['./editkkm.component.css']
})
export class EditkkmComponent {

  public dataKkmForm!: FormGroup;
  public mapel !: any;
  public siswa !: any;
  public uid!: any;
  public tema !: any;
  public sub_tema !: any;
  unikMapel: any[] = [];
  unikTema: any[] = [];
  unikSubTema: any[] = [];
  masterData: any[] = [];

  constructor(private _fb: FormBuilder, public dialogref: MatDialogRef<EditkkmComponent>,
    private api: ApiService,
    private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public kelas: any

  ) { }

  ngOnInit(): void {
    this.dataKkmForm = new FormGroup({
      kelas: new FormControl(),
      mapel: new FormControl(),
      tema: new FormControl(),
      sub_tema: new FormControl(),
      kkm: new FormControl(),

    })

    this.dataKkmForm.patchValue(this.data);
    this.getKelas();
    this.getMapel();
    this.initFromMapel();

  }

  initFromMapel() {
    this.mapel = this.masterData.map((item: { mapel: any }) => ({ mapel: item.mapel }));
    this.mapel = this.masterData.map((item: { tema: any }) => ({ mapel: item.tema }));
    this.mapel = this.masterData.map((item: { sub_tema: any }) => ({ mapel: item.sub_tema }));
    this.filterMapel();

    const mapelForm = this.dataKkmForm.get('mapel');
    if (mapelForm) {
      mapelForm.valueChanges.subscribe(res => {

        this.filterM(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.mapel) {
        mapelForm.patchValue(this.data.mapel);
      }
    }

    const temaForm = this.dataKkmForm.get('tema');
    if (temaForm) {
      temaForm.valueChanges.subscribe(res => {

        this.filterM(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.tema) {
        temaForm.patchValue(this.data.tema);
      }
    }

    const subTemaForm = this.dataKkmForm.get('sub_tema');
    if (subTemaForm) {
      subTemaForm.valueChanges.subscribe(res => {

        this.filterM(res);
      });

      // set nilai awal form jika sedang dalam mode edit
      if (this.data && this.data.sub_tema) {
        subTemaForm.patchValue(this.data.sub_tema);
      }
    }
  }


  filterM(enterData: any) {
    if (!enterData) {
      // jika input kosong, tampilkan semua data
      this.filterMapel();
    } else {
      // filter data berdasarkan input
      this.unikMapel = this.unikMapel.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })

      this.unikTema = this.unikTema.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })

      this.unikSubTema = this.unikSubTema.filter((item: string) => {
        return item.toLowerCase().indexOf(enterData.toLowerCase()) > -1
      })
    }
  }
  
  filterMapel() {
    this.unikMapel = Array.from(new Set(this.mapel.map((item: { mapel: string; }) => item.mapel)));
    this.unikTema = Array.from(new Set(this.mapel.map((item: { tema: string; }) => item.tema)));
    this.unikSubTema = Array.from(new Set(this.mapel.map((item: { sub_tema: string; }) => item.sub_tema)));
    // console.log(this.unikMapel);
    // console.log(this.unikTema);
    // console.log(this.unikSubTema);
  }

  getKelas() {
    this.api.ambilDataKelas().subscribe(res => {
      this.kelas = res;
    })
  }

  getMapel() {
    this.api.ambilDataMapel().subscribe(res => {
      this.mapel = res;
      this.filterMapel();
  
    })
  }

  simpan() {
    this.api.ubahDataKkm(this.data.id, this.dataKkmForm.value).subscribe(res => {
      this.toastr.success('Berhasil Mengupdate Data!!!', 'Data KKM');
      this.dialogref.close();
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    },
    )
  }

}
