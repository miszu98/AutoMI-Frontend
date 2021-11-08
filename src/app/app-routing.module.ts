import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { Router, RouterModule } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { MyOffersComponent } from './Components/my-offers/my-offers.component';
import { OfferDetailsComponent } from './Components/OfferDetails/offer-details/offer-details.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

const routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'main', component: MainComponent},
  {path: 'my-offers', component: MyOffersComponent},
  {path: ':id/offer', component: OfferDetailsComponent},
  {path: 'change-password/:uuid', component: ChangePasswordComponent}
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
