import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { UserI } from '../../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: ApiService, private http: HttpClient) {}

  RegisterUserWithoutLogin(form: UserI): Observable<ResponseI> {
    let url = this.api.url + 'register';
    return this.http.post<ResponseI>(url, form);
  }

  GetIdTypes(): Observable<ResponseI> {
    let url = this.api.url + 'idtype';
    let headers = this.api.headers();
    return this.http.get<ResponseI>(url, { headers });
  }

  GetRoles(): Observable<ResponseI> {
    let url = this.api.url + 'role';
    let headers = this.api.headers();
    return this.http.get<ResponseI>(url, { headers });
  }

  RegisterUser(form: UserI): Observable<ResponseI> {
    let url = this.api.url + 'user';
    let headers = this.api.headers();
    return this.http.post<ResponseI>(url, form, { headers });
  }

  GetUsers(): Observable<ResponseI> {
    let url = this.api.url + 'user';
    let headers = this.api.headers();
    return this.http.get<ResponseI>(url, { headers });
  }

  GetUser(id: number): Observable<ResponseI> {
    let url = this.api.url + 'user/' + id;
    let headers = this.api.headers();
    return this.http.get<ResponseI>(url, { headers });
  }

  EditUser(id: number, form: UserI): Observable<ResponseI> {
    let url = this.api.url + 'user/' + id;
    let headers = this.api.headers();
    return this.http.post<ResponseI>(url, form, { headers });
  }

  DeleteUser(id: string): Observable<ResponseI> {
    let url = this.api.url + 'user/' + id;
    let headers = this.api.headers();
    return this.http.delete<ResponseI>(url, { headers });
  }
}
