import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { MailServiceService } from 'src/app/Services/MailService/mail-service.service';
import { ShareDataService } from 'src/app/Services/ShareData/share-data.service';
import { TokenStorageService } from 'src/app/Services/TokenStorage/token-storage.service';
import { InformationsComponent } from '../Dialogs/informations/informations.component';
import jwt_decode from "jwt-decode";
import { Jwt } from 'src/app/Models/Jwt';

const PASSWORD_PATTERN = '(?=.*[a-z])' + 
                        '(?=.*[0-9])' + 
                        '(?=.*[A-Z])' + 
                        '(?=.*[!?.,;@#$%^&*])' + 
                        '[a-zA-Z0-9!?.,;@#$%^&*]' + 
                        '{8,30}';

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
  samePassword = true;
  userAlreadyExists = false;

  loginFailStatusMessage = false;

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    password2 : new FormControl('', Validators.required)
  });

  constructor(private dialog: MatDialog, 
    private authService: AuthService, 
    private router: Router, 
    private tokenStorage: TokenStorageService, 
    private shareDataService: ShareDataService,
    private mailService: MailServiceService) { }

  ngOnInit(): void {
  }

  public sendChangePasswordEmail() {
    if (this.loginForm.get("email")?.invalid) {
      this.loginForm.get('email')?.markAsTouched();
    } else {
      this.mailService.sendChangePasswordEmail(this.loginForm.get('email')?.value).subscribe(
        value => {
          console.log(value);
          window.location.href = "http://localhost:4200/sign-in"
        },
        e => {
          console.log(e);
        }
      );
    }

  }

  public clearForm() {
    let email = this.loginForm.get('email');
    let password = this.loginForm.get('password');
    let password2 = this.loginForm.get('password2');

    email?.setValue('');
    password?.setValue('');
    password2?.setValue('');

    email?.markAsUntouched();
    password?.markAsUntouched();
    password2?.markAsUntouched();
  }

  public loadRegisterForm() {
    this.clearForm();
    this.forgotPassword = false;
    let element = document.getElementById('clickable-elements') as HTMLElement;
    element.style.marginBottom = '5%';
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      element.style.marginBottom = '17%';
      this.loadRegisterGui();
      this.clearForm();
    }, 1100);
  }

  public loadRegisterGui() {
    this.forgotPassword = false;
    let windowName = document.getElementById('label') as HTMLElement;
    windowName.innerHTML = 'Sign Up'

    let icon = document.getElementById('person-icon') as HTMLElement;
    icon.innerHTML = 'person_add';

    this.loginFailStatusMessage = false;
    this.userAlreadyExists = false;

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
    this.clearForm();
    this.forgotPassword = false;
    let element = document.getElementById('clickable-elements') as HTMLElement;
    element.style.marginBottom = '5%';
    this.loading = true;
    this.samePassword = true;
    setTimeout(() => {
      this.loading = false;
      element.style.marginBottom = '17%';
      this.loadLoginGui();
      this.clearForm();
    }, 1100);
  }

  public loadForgotPassword() {
    this.clearForm();
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

  public onSubmit() {
    let email = this.loginForm.get('email');
    let password = this.loginForm.get('password');

    if (email?.value == '' || password?.value == '') {
      email?.markAsTouched();
      password?.markAsTouched();
    } else {
      this.authService.login({email: email?.value, password: password?.value}).subscribe(
        value => {
          console.log(value);
          let jwt: Jwt = jwt_decode(value.token);
          this.tokenStorage.saveToken(value.token);
          this.tokenStorage.saveUser({id: jwt.id, email: jwt.sub, role: jwt.role, token: value.token});
          this.shareDataService.setLoggedIn(true);
          this.shareDataService.setLoginFailed(false);
          this.shareDataService.setRole(this.tokenStorage.getUser().role);
          this.router.navigate(['/main']);
          this.loginFailStatusMessage = false;
        },
        error => {
          this.loginFailStatusMessage = true;
          console.log(error);
        }
      )
    }
  }

  public register() {
    let email = this.loginForm.get('email');
    let password = this.loginForm.get('password');
    let password2 = this.loginForm.get('password2');

    if (email?.value == '' || password?.value == '' || password2?.value == '') {
      email?.markAsTouched();
      password?.markAsTouched();
      password2?.markAsTouched();
    }

    if (password?.value != password2?.value) {
      this.samePassword = false;
      return;
    } else {
      this.authService.register({email: email?.value, password: password?.value}).subscribe(
        value => {
          console.log(value);
          window.location.href = 'http://localhost:4200/sign-in';
        },
        e => {
          console.log(e);
          if (e.error[0] == 'User with email: ' + this.loginForm.get('email')?.value + ' already exists') {
            this.userAlreadyExists = true;
          }
        }
      )
    }
  }

  public getErrorMessageEmail() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  public getErrorMessageRegisterPassword() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } return this.loginForm.get('password')?.hasError('pattern') ? 'Not a valid password. Length (8-30) 1 upper case letter 1 digit 1 special char' : '';
  }

  public getErrorMessageLoginPassword() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } return '';
  }


}
