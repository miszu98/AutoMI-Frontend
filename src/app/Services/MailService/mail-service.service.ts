import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://localhost:8080/api/email/"

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient) { }


  public sendChangePasswordEmail(email: string) {
    return this.http.post(API, {to: email});
  }

  public sendNewPassword(newPassword: string, uuid: string) {
    return this.http.post(API + uuid, {newPassword: newPassword});
  }

}
