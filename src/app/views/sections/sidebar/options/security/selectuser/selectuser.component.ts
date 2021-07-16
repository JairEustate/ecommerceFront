import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseI } from 'src/app/interfaces/response.interface';
import { UsersService } from 'src/app/services/api/users/users.service';

@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.component.html',
  styleUrls: ['./selectuser.component.css']
})
export class SelectuserComponent implements OnInit {

  constructor(private api: UsersService,private router: Router) { }
  error: boolean = false;
  exit: boolean = false;
  msj = '';
  sidebarActive: boolean = true;
  users: any = null;
  user:any=null;

  ngOnInit(): void {
    if (localStorage.getItem("reloadior") == null) {
      localStorage.setItem("reloadior", "true");
      window.location.reload()
    } else {
      localStorage.removeItem("reloadior");
    }
    this.users = localStorage.getItem('Users');
    this.users = JSON.parse(this.users);
  }

  hideSidebar() {
    if (this.sidebarActive == true) {
      this.sidebarActive = false;
    } else {
      this.sidebarActive = true;
    }
  }

  onDelete(id: any, firstname: any, firstlstname: any) {

    if (confirm("¿Seguro desea eliminar el usuario " + firstname + " " + firstlstname + "?")) {

      this.api.DeleteUser(id).subscribe(data => {
        let dataResponse: ResponseI = data;

        if (dataResponse.status == "200") {
          this.api.GetUsers().subscribe(data => {
            let dataResponse: ResponseI = data;
            localStorage.setItem("Users", JSON.stringify(dataResponse.data.users));
          })
          this.exit = true;
          this.msj = dataResponse.data.message_es;
          setTimeout('window.location.reload()', 500);
        }

        if (dataResponse.status == "404") {
          this.api.GetUsers().subscribe(data => {
            let dataResponse: ResponseI = data;
            localStorage.setItem("Users", JSON.stringify(dataResponse.data.users));
          })
          this.error = true;
          this.msj = dataResponse.error.message_es;
          setTimeout('window.location.reload()', 500);
        }
      })
    }
  }

  onEdit(id:number){    
    this.api.GetUser(id).subscribe(data => {
      let dataResponse: ResponseI = data;

      if (dataResponse.status == 200) {
        localStorage.setItem('EditUser', JSON.stringify(dataResponse.data.user))
        this.user = localStorage.getItem('EditUser');
        this.user = JSON.parse(this.user);
        localStorage.setItem('idtype', this.user.idtype);
        localStorage.setItem('idnumber', this.user.idnumber);
        localStorage.setItem('firstname', this.user.firstname);
        localStorage.setItem('firstlastname', this.user.firstlastname);
        localStorage.setItem('secondname', this.user.secondname);
        localStorage.setItem('secondlastname', this.user.secondlastname);
        localStorage.setItem('role', this.user.role);
        localStorage.setItem('email', this.user.email);
        this.router.navigate(['/edit-user', id]);
      }

      if (dataResponse.status == 404) {
        setTimeout('window.location.reload()', 500);
      }


    

    })
  }
   

  
}
