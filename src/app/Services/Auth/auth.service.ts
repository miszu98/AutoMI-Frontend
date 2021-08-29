import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { Credentials } from 'src/app/Models/Credentials';

const AUTH_API = 'http://localhost:8080/api/auth/';
const REGISTER_API = 'http://localhost:8080/api/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(credentials: Credentials) : Observable<any> {
    return this.http.post(AUTH_API, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  public register(user: User) : Observable<any> {
    return this.http.post(REGISTER_API, {
      email: user.email,
      password: user.password
    }, httpOptions);
  }



}
