import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../../../services/api/login/login.service';
import { Router } from '@angular/router';
import { ResponseI } from '../../../interfaces/response.interface';
import { LoginI } from '../../../interfaces/login.interface';
import { UsersService } from 'src/app/services/api/users/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginApi: LoginService, private userApi: UsersService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  error: boolean = false;
  msj = "";

  ngOnInit(): void {

  }

  onLogin(form: LoginI) {
    this.loginApi.loginByEmail(form).subscribe(data => {
      let dataResponse: ResponseI = data;

      if (dataResponse.status == "200") {
        localStorage.setItem("auth.token", dataResponse.data.token);
        localStorage.setItem("current.user", JSON.stringify(dataResponse.data.user));
        if (dataResponse.data.user.role.name == 'ADMIN') {
          this.userApi.GetIdTypes().subscribe(data => {
            let dataResponse: ResponseI = data;
            localStorage.setItem("IdTypes", JSON.stringify(dataResponse.data.IdTypes));
          });
          this.userApi.GetRoles().subscribe(data => {
            let dataResponse: ResponseI = data;
            localStorage.setItem("Roles", JSON.stringify(dataResponse.data.Roles));            
          });
          this.userApi.GetUsers().subscribe(data => {
            let dataResponse: ResponseI = data;
            localStorage.setItem("Users", JSON.stringify(dataResponse.data.users));
            window.location.href = "/home";
          });
        } else {
          window.location.href = "/home";
        }
      }
      if (dataResponse.status == "404") {
        this.error = true;
        this.msj = dataResponse.error.message_es;
        console.log(dataResponse.error.message_es);
      }
    });
  };
};
