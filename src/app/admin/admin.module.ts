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
      {
        path: 'laporan', component: LaporanComponent,
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
  ]
})
export class AdminModule { }
