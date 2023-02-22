import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup|any;

  constructor(private _fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: ApiService,
    

  ) {
  }

ngOnInit(): void {
  this.login = new FormGroup({
    'username': new FormControl(),
    'pass': new FormControl()
  })
}

 

  loginApp(login:FormGroup) {

  this.service.loginCode(this.login.value.username).subscribe(res=>{
    const usera = res.find((a:any)=>{
      return a.username === this.login.value.username && a.pass === this.login.value.pass
    });

    if(usera){
      this.toastr.success('Login Berhasil', 'Info');
      this.login.reset();
      this.router.navigate(['admin/dashboard-admin']);
     
    }else{
      this.toastr.warning('Login Gagal', 'Info');
      this.router.navigate(['']);
    }
  })
  
  }

}
