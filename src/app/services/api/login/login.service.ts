import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { LoginI } from '../../../interfaces/login.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private api: ApiService, private http: HttpClient) {}

  loginByEmail(form: LoginI): Observable<ResponseI> {
    let url = this.api.url + 'auth/login';
    return this.http.post<ResponseI>(url, form);
  }

  logout(): Observable<ResponseI> {
    let headers = this.api.headers();
    let url = this.api.url + 'auth/logout';
    return this.http.get<ResponseI>(url,{headers});
  }
}
