import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { SiswaComponent } from './siswa/siswa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { KelasComponent } from './kelas/kelas.component';
import { GuruComponent } from './guru/guru.component';
import { MapelComponent } from './mapel/mapel.component';
import { TemaComponent } from './tema/tema.component';
import { LaporanComponent } from './laporan/laporan.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddComponent } from './guru/add/add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './guru/edit/edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddSiswaComponent } from './siswa/add-siswa/add-siswa.component';
import { AddkelasComponent } from './kelas/addkelas/addkelas.component';
import { DeletekelasComponent } from './kelas/deletekelas/deletekelas.component';
import { EditkelasComponent } from './kelas/editkelas/editkelas.component';
import { AddmapelComponent } from './mapel/addmapel/addmapel.component';
import { EditmapelComponent } from './mapel/editmapel/editmapel.component';
import { DeletemapelComponent } from './mapel/deletemapel/deletemapel.component';
import { AddtemaComponent } from './tema/addtema/addtema.component'; 
import { EdittemaComponent } from './tema/edittema/edittema.component'; 
import { DeletetemaComponent } from './tema/deletetema/deletetema.component'; 
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


const routes: Routes = [
  {
    path: '',component: DashboardComponent,
    children: [
      {
        path: 'dashboard-admin', component: DashboardAdminComponent,
      },
      {
        path: 'kelas', component: KelasComponent,
      },
      {
        path: 'guru', component: GuruComponent,
      },
      {
        path: 'siswa', component: SiswaComponent,
      },
      {
        path: 'mapel', component: MapelComponent,
      },
      {
        path: 'tema', component: TemaComponent,
      },
    ]
    
  }
]

@Injectable({
  providedIn: 'root'
})

@NgModule({
  declarations: [
    SiswaComponent,
    DashboardComponent,
    KelasComponent,
    GuruComponent,
    MapelComponent,
    TemaComponent,
    LaporanComponent,
    AddComponent,
    EditComponent,
    DashboardAdminComponent,
    AddSiswaComponent,
    AddkelasComponent,
    DeletekelasComponent,
    EditkelasComponent,
    AddmapelComponent,
    EditmapelComponent,
    DeletemapelComponent,
    AddtemaComponent,
    EdittemaComponent,
    DeletetemaComponent,  


  ],
  imports: [
    CommonModule,
    MaterialDesign,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule
  ]
})
export class AdminModule { }
