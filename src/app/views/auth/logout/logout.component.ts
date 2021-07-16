import { Component, OnInit } from '@angular/core';
import { ResponseI } from 'src/app/interfaces/response.interface';
import { LoginService } from 'src/app/services/api/login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private api: LoginService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.api.logout().subscribe((data) => {
      let dataResponse: ResponseI = data;
      if (dataResponse.status == '200') {
        localStorage.clear()
        window.location.reload()
      }
      if (dataResponse.status == '400') {
        localStorage.clear()
        window.location.reload()
      }

    })
  }
}
