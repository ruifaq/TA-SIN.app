import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuruComponent } from './dashboard-guru/dashboard-guru.component';
import { MaterialDesign } from '../material/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileGuruComponent } from './profile-guru/profile-guru.component';
import { SiswaComponent } from './siswa/siswa.component';
import { NilaiComponent } from './nilai/nilai.component';
import { KkmComponent } from './kkm/kkm.component';
import { LaporanComponent } from './laporan/laporan.component';

const routes: Routes = [
  {
    path: '',component: DashboardComponent,
    children: [
      {
        path: 'dashboard-guru', component: DashboardGuruComponent,
      },
      {
        path: 'profile-guru', component: ProfileGuruComponent,
      },
      {
        path: 'siswa', component: SiswaComponent,
      },
      {
        path: 'nilai', component: NilaiComponent,
      },
      {
        path: 'kkm', component: KkmComponent,
      },
      {
        path: 'laporan', component: LaporanComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardGuruComponent,
    ProfileGuruComponent,
    SiswaComponent,
    NilaiComponent,
    KkmComponent,
    LaporanComponent
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
export class GuruModule { }
