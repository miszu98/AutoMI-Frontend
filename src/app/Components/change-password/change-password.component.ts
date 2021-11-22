import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MailServiceService } from 'src/app/Services/MailService/mail-service.service';


const PASSWORD_PATTERN = '(?=.*[a-z])' + 
                        '(?=.*[0-9])' + 
                        '(?=.*[A-Z])' + 
                        '(?=.*[!?.,;@#$%^&*])' + 
                        '[a-zA-Z0-9!?.,;@#$%^&*]' + 
                        '{8,30}';
                        
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  flag = false;
  changingPasswordLoading = false;


  changePasswordForm: FormGroup = new FormGroup({
    password1: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    password2: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute, private mailService:  MailServiceService) { }

  ngOnInit(): void {
  }

  public getPasswordErrorMessage() {
      if (this.changePasswordForm.get('password1')?.hasError('required')) {
        return 'You must enter a value';
      } return this.changePasswordForm.get('password1')?.hasError('pattern') ? 'Not a valid password. Length (8-30) 1 upper case letter 1 digit 1 special char' : '';
  }

  public changePassword() {
    this.changingPasswordLoading = true;
    let passwd1 = this.changePasswordForm.get("password1")?.value;
    let passwd2 = this.changePasswordForm.get("password2")?.value;

    if (passwd1 != passwd2) {
      this.flag = true;
      // this.changingPasswordLoading = false;
      return;
    } else {
      this.flag = false;
      // this.changingPasswordLoading = false;
    }

    this.route.params.subscribe(
      params => {
        this.mailService.sendNewPassword(this.changePasswordForm.get('password1')?.value, params.uuid).subscribe(
          value => {
            console.log(value);
            // this.changingPasswordLoading = false;
            window.location.href = "http://localhost:4200/sign-in";
          },
          e => {
            this.changingPasswordLoading = false;
            console.log(e);
          }
        );
      }
    );

  }

}
