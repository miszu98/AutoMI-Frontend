import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { InformationsComponent } from './Components/Dialogs/informations/informations.component';
import { MainComponent } from './Components/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyOffersComponent } from './Components/my-offers/my-offers.component';
import { HttpClientModule } from '@angular/common/http';
import { CarOfferPipe } from './Pipes/CarOffer/car-offer.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OfferDetailsComponent } from './Components/OfferDetails/offer-details/offer-details.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CurrencyPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    InformationsComponent,
    MainComponent,
    MyOffersComponent,
    CarOfferPipe,
    OfferDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatChipsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCarouselModule,
    MatAutocompleteModule
  ],
  providers: [CarOfferPipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
