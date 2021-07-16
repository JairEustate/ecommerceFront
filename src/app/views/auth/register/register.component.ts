import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from 'src/app/interfaces/response.interface';
import { UserI } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/api/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterUserForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    secondname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    firstlastname: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Zñáéíóú ]+$/)]),
    secondlastname: new FormControl('', [Validators.pattern(/^[a-zñ ]+$/)]),
    email: new FormControl('', [Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9.@]+$/)]),
    password: new FormControl('', [Validators.required]),
    password_confirm: new FormControl('', [Validators.required]),
    secretWord: new FormControl('', Validators.required)
  })

  constructor(private api:UsersService) { }
  msj:string = "";
  exit:boolean = false;
  error:boolean = false;

  ngOnInit(): void {
  }

  onRegisterUser(form:UserI){
    if(form.password !== form.password_confirm){
      this.error = true;
      this.msj="Las contraseñas no coinciden";
    }else{
      this.error = false;
      form.firstname = form.firstname.toUpperCase().trim();
      form.secondname = form.secondname.toUpperCase().trim();
      form.firstlastname = form.firstlastname.toUpperCase().trim();
      form.secondlastname = form.secondlastname.toUpperCase().trim();
      form.email = form.email.toLowerCase();
      console.log(form.secretWord)

      this.api.RegisterUserWithoutLogin(form).subscribe((data) => {
        let dataResponse:ResponseI =data;
        if(dataResponse.status == 200){
          this.error = false;
          this.exit = true;
          this.msj = dataResponse.data.message_es;
          window.location.reload();
        }
        if(dataResponse.status == 400){
          this.error = true;
          this.exit = false;
          this.msj = dataResponse.error.message_es;
        }
      })
    }


    


  }

}
