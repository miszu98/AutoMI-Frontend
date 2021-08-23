import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformationsComponent } from '../Dialogs/informations/informations.component';

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
  flag = false;
  forgotPassword = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public loadRegisterForm() {
    this.forgotPassword = false;
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
    this.forgotPassword = false;
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Sign Up'

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'person_add';

    this.flag = true;
  }

  public loadLoginGui() {
    this.forgotPassword = false;
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Sign In'

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'person';

    this.flag = false;
  }
  
  public loadLoginForm() {
    this.forgotPassword = false;
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
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Change Password';

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'lock';
    

    this.forgotPassword = true;
  }

  public loadSupportDialog() {
    const dialogRef = this.dialog.open(InformationsComponent);
  }

  public loadContactDialog() {
    const dialogRef = this.dialog.open(InformationsComponent);
  }

  public loadTermsOfUseDialog() {
    const dialogRef = this.dialog.open(InformationsComponent);
  }



}
