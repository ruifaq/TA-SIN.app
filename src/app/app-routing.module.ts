import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuruComponent } from './guru/guru.component';

import { LoginComponent } from './login/login.component';


const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'guru',
    loadChildren: () => import('./guru/guru.module').then(mod => mod.GuruModule)
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
