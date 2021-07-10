import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrls: any
  constructor(
    private http: HttpClient
  ) {
    this.apiUrls = environment;
  }

  login(Email: any, Password: any): Observable<any> {
    const url = this.apiUrls.baseUrl + this.apiUrls.authenticationService.login
    const payload = {
      apiKey: this.apiUrls.apiKey,
      email: Email,
      password: Password
    }
    const httpOptions = this.apiUrls.httpOptions;
    return this.http.post(url, payload, httpOptions);
  }
}
