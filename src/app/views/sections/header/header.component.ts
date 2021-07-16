import { Component, OnInit } from '@angular/core';
import { ResponseI } from '../../../interfaces/response.interface';
import { LoginService } from '../../../services/api/login/login.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api: LoginService) { }
  user: any = null;
  ngOnInit(): void {
    this.user = localStorage.getItem("current.user");
    this.user = JSON.parse(this.user);
  }

  onLogout(): void {
    localStorage.clear()
    window.location.href = "/"
  }
}
