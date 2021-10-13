import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { CarOffer } from 'src/app/Models/CarOffer';
import { Slide } from 'src/app/Models/Slide';
import { CarOffersService } from 'src/app/Services/CafOffers/car-offers.service';
import { ShareDataService } from 'src/app/Services/ShareData/share-data.service';
import { TokenStorageService } from 'src/app/Services/TokenStorage/token-storage.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  title = 'AutoMI';

  declare carOffer: CarOffer;
  declare offerId: number;

  slides: Array<Slide> = [];

  // slides = [];

  constructor(
    private route: ActivatedRoute, 
    private shareDataService: ShareDataService, 
    private tokenStorageService: TokenStorageService,
    private carOfferService: CarOffersService
    ) { }

  ngOnInit(): void {
    this.getById();
  }

  public getById() {
    this.route.params.subscribe(
      params => {
        this.offerId = params.id;
      }
    );
    this.carOfferService.getById(this.offerId).subscribe(
      value => {
        this.carOffer = value;
        console.log(value);
        for (let image of this.carOffer.images) {
          this.slides.push({image: image.url})
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public getLoggedIn(): string | null {
    console.log(this.shareDataService.getLoggedIn());
    return this.shareDataService.getLoggedIn();
  }

  public logout() {
    this.shareDataService.setLoggedIn(false);
    this.shareDataService.setRole('');
    this.tokenStorageService.signOut();
  }



}
