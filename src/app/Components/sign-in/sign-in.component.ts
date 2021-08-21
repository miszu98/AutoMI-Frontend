import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isActive = true;
  hide = true;

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  public loadRegisterForm() {
    let panel = document.getElementById('sign-in-panel') as HTMLElement;

    panel.style.backgroundColor = 'background-color: rgba(255, 255, 255, 0.1);';
    panel.style.filter = 'blur(4px)';
    
    this.loading = true;

    console.log("hello");
  }

}
