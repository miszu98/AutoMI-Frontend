import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  isActive = true;
  hide = true;
  loading = false;
  isDisabled = false;
  form = false;

  constructor() { }

  ngOnInit(): void {
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public loadRegisterForm() {
    let element = document.getElementById('clickable-elements') as HTMLElement;
    element.style.marginBottom = '5%';
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      element.style.marginBottom = '17%';
    }, 1500);

    
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
