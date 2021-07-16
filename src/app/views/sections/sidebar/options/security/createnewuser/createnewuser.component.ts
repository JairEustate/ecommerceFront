import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from '../../../../../../interfaces/response.interface';
import { UserI } from '../../../../../../interfaces/user.interface';
import { UsersService } from '../../../../../../services/api/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnewuser',
  templateUrl: './createnewuser.component.html',
  styleUrls: ['./createnewuser.component.css'],
})
export class CreatenewuserComponent implements OnInit {
  date = new Date(new Date().getTime());
  RegisterUserForm = new FormGroup({
    idtypeId: new FormControl('', Validators.required),
    idnumber: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9-]+$/)]),
    firstname: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    secondname: new FormControl('', [Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    firstlastname: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    secondlastname: new FormControl('', [Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    roleId: new FormControl('', Validators.required)
  });

  error: boolean = false;
  exit: boolean = false;
  msj = '';
  admin = false;

  constructor(private api: UsersService, private router: Router) { }
  user: any = null;
  typeids: any = null;
  roles: any = null;
  gims: any = null;
  sidebarActive: boolean = true;

  ngOnInit(): void {
    this.typeids = localStorage.getItem('IdTypes');
    this.typeids = JSON.parse(this.typeids);
    this.roles = localStorage.getItem('Roles');
    this.roles = JSON.parse(this.roles);
    this.user = localStorage.getItem('current.user');
    this.user = JSON.parse(this.user);
  }

  hideSidebar() {
    if (this.sidebarActive == true) {
      this.sidebarActive = false;
    } else {
      this.sidebarActive = true;
    }
  }

  onRegisterUser(form: UserI) {
    this.api.RegisterUser(form).subscribe((data) => {
      let dataResponse: ResponseI = data;

      if (dataResponse.status == '201') {
        this.error = false;
        this.exit = true;
        this.msj = dataResponse.data.message_es;
        this.api.GetUsers().subscribe(data => {
          let dataResponse: ResponseI = data;
          localStorage.setItem("Users", JSON.stringify(dataResponse.data.users));
          setTimeout('window.location.reload()', 500);
        });        
      };

      if (dataResponse.status == '400') {
        this.error = true;
        this.exit = false;
        this.msj = dataResponse.error.message_es;
      }
    });
  }

  clear() {
    setTimeout('window.location.reload()', 1);
  }
}
