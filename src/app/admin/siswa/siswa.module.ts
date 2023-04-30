import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';



@NgModule({
  declarations: [
    EditComponent,
    DeleteComponent,
   
  ],
  imports: [
    CommonModule,
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
export class SiswaModule {
  slice() {
    throw new Error('Method not implemented.');
  }
  nis!: string;
  nama!: string ;
  alamat!: string ;
  hp!: string ;
  kelas!: string ;
  ta!: string ;
 }
