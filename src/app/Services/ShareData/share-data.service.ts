import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  public setLoggedIn(value: boolean) {
    window.localStorage.setItem("isLogged", value.toString());
  }

  public getLoggedIn() {
    return window.localStorage.getItem("isLogged");
  }

  public setLoginFailed(value: boolean) {
    window.localStorage.setItem("loginFailed", value.toString());
  }

  public getLoginFailed() {
    return window.localStorage.getItem("loginFailed");
  }

  public setRole(value: string) {
    window.localStorage.setItem("role", value);
  }

  public getRole() {
    return window.localStorage.getItem("role");
  }

  public setErrorMessage(value: string) {
    window.localStorage.setItem("errorMessage", value);
  }

  public getErrorMessage(value: string) {
    return window.localStorage.getItem("errorMessage");
  }
  
}
