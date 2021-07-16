import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from '../../../../../../interfaces/response.interface';
import { UserI } from '../../../../../../interfaces/user.interface';
import { UsersService } from '../../../../../../services/api/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  EditUserForm = new FormGroup({
    idtypeId: new FormControl(localStorage.getItem('idtype'), Validators.required),
    idnumber: new FormControl(localStorage.getItem('idnumber'), [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]),
    firstname: new FormControl(localStorage.getItem('firstname'), [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    secondname: new FormControl(localStorage.getItem('secondname'), [Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    firstlastname: new FormControl(localStorage.getItem('firstlastname'), [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    secondlastname: new FormControl(localStorage.getItem('secondlastname'), [Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$/)]),
    email: new FormControl(localStorage.getItem('email'), [Validators.required, Validators.email]),
    roleId: new FormControl(localStorage.getItem('role'), Validators.required),
  });

  id: any = null;
  user: any = null;
  typeids: any = null;
  roles: any = null;
  error: boolean = false;
  exit: boolean = false;
  msj = '';
  sidebarActive: boolean = true;
  loading: boolean = true;
  nofound: boolean = false;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    });

    this.typeids = localStorage.getItem('IdTypes');
    this.typeids = JSON.parse(this.typeids);
    this.roles = localStorage.getItem('Roles');
    this.roles = JSON.parse(this.roles);

      localStorage.removeItem('EditUser');  
      localStorage.removeItem("reloadior");
      localStorage.removeItem('idtype');
      localStorage.removeItem('idnumber');
      localStorage.removeItem('firstname');
      localStorage.removeItem('firstlastname');
      localStorage.removeItem('secondname');
      localStorage.removeItem('secondlastname');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    }

  hideSidebar() {
    if (this.sidebarActive == true) {
      this.sidebarActive = false;
    } else {
      this.sidebarActive = true;
    }
  }

  constructor(
    private api: UsersService,
    private route: ActivatedRoute
  ) { }



  onEditUser(form: UserI) {
    this.api.EditUser(this.id, form).subscribe((data) => {
      let dataResponse: ResponseI = data;
      if (dataResponse.status == '200') {
        this.error = false;
        this.exit = true;
        this.msj = dataResponse.data.message_es;
        this.api.GetUsers().subscribe((data) => {
          let dataResponse: ResponseI = data;
          localStorage.setItem('Users',JSON.stringify(dataResponse.data.users)
          );
          window.location.href = '#/edit-user';
        });
      }

      if (dataResponse.status == '400') {
        this.error = false;
        this.exit = true;
        this.msj = dataResponse.error.message_es;
      }
    });
  }

  clear() {
    this.EditUserForm.reset();
  }
}
