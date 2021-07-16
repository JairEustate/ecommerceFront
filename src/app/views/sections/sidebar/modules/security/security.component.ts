import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor() { }
  active = false;
  opt1 = false;
  opt2 = false;
  user: any = null;

  ngOnInit(): void {
    this.user = localStorage.getItem("current.user")
    this.user = JSON.parse(this.user)
    
      if (document.location.href?.includes("create-new-user")) {
        this.opt1 = true; this.active = true;
      }else if (document.location.href?.includes("edit-user")) {
         this.opt2 = true; this.active = true;
      } else {
      this.active = false;
    }
  }
}
