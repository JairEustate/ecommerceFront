import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GimI } from 'src/app/interfaces/gim.interface';
import { SessionI } from 'src/app/interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class GimsService {
  constructor(private api: ApiService, private http: HttpClient) {}

  RegisterGim(form: GimI): Observable<ResponseI> {
    let url = this.api.url + 'gim';
    let headers = this.api.headers();
    return this.http.post<ResponseI>(url, form, { headers });
  }

  RegisterSession(form: SessionI): Observable<ResponseI> {
    let url = this.api.url + 'session';
    let headers = this.api.headers();
    return this.http.post<ResponseI>(url, form, { headers });
  }
}
