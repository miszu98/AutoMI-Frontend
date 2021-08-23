import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { Router, RouterModule } from '@angular/router';
import { MainComponent } from './Components/main/main.component';

const routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'main', component: MainComponent}
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
