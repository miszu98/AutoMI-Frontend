import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { Router, RouterModule } from '@angular/router';

const routes = [
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
