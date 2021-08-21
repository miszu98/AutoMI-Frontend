import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  isActive = true;
  hide = true;
  hideSecond = true;
  loading = false;
  registerForm = false;

  constructor() { }

  ngOnInit(): void {
  }

  public loadRegisterForm() {
    let element = document.getElementById('clickable-elements') as HTMLElement;
    element.style.marginBottom = '5%';
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      element.style.marginBottom = '17%';
      this.loadRegisterGui();
    }, 1100);
  }

  public loadRegisterGui() {
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Sign Up'

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'person_add';

    this.registerForm = true;
  }

  public loadLoginGui() {
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Sign In'

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'person';

    this.registerForm = false;
  }
  
  public loadLoginForm() {
    let element = document.getElementById('clickable-elements') as HTMLElement;
    element.style.marginBottom = '5%';
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      element.style.marginBottom = '17%';
      this.loadLoginGui();
    }, 1100);
  }

  public loadForgotPassword() {
    
  }

  public loadSupportDialog() {

  }

  public loadContactDialog() {

  }

  public loadTermsOfUseDialog() {

  }

}
