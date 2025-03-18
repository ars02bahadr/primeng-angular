import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HttpService } from '../../shared/http.service';
import { ToastModule } from 'primeng/toast';
import { HelperComponent } from "../../shared/helper.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    CheckboxModule,
    PasswordModule,
],
  templateUrl: './login.component.html',
  styles: ``,
  providers: []
})
export class LoginComponent implements OnInit {

  constructor(private httpService:HttpService,private router:Router) { }
  
  ngOnInit(): void {

  }
  email: string = '';

    password: string = '';

    checked: boolean = false;

  login(){
    this.httpService.post("Auth/Login",{emailOrUserName:this.email,password:this.password},(res:any)=>{
      localStorage.setItem("token", res.token);
      this.router.navigate(['/']);
    })
  }

}
