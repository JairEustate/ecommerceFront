import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  DateForm = new FormGroup({
    time: new FormControl('', Validators.required)
  })
  
  constructor(private router: Router) { }
  sidebarActive: boolean = true;

  ngOnInit(): void {    
  }

  hideSidebar() {
    if (this.sidebarActive == true) {
      this.sidebarActive = false;
    } else {
      this.sidebarActive = true;
    }
  }
}
