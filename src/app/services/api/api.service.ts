import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/api/';
  //--proxy-config proxy.conf.json

  headers() {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth.token')
    );
    headers = headers.append('Accept', 'application/json');

    return headers;
  }

  constructor() {}
}
