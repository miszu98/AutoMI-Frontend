import { Component, OnInit } from '@angular/core';
import { CarOffer } from 'src/app/Models/CarOffer';
import { Mark } from 'src/app/Models/Mark';
import { Model } from 'src/app/Models/Model';
import { CarOffersService } from 'src/app/Services/CafOffers/car-offers.service';
import { MarksService } from 'src/app/Services/Marks/marks.service';
import { ModelsService } from 'src/app/Services/Models/models.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  carTypes = [
    'COUPE',
    'SEDAN',
    'WAGON',
    'HATCHBACK',
    'TRUCK',
    'SUV',
    'CABRIOLET',
    'MINIVAN',
    'COMPACT'
  ]

  title = 'AutoMI';
  showMenu = false;

  declare marks: Array<Mark>;
  declare models: Array<Model>;
  declare offers: Array<CarOffer>;
  declare size: number;

  constructor(
    private markService: MarksService,
    private modelService: ModelsService,
    private carOfferService: CarOffersService,
    ) { }

  ngOnInit(): void {
    this.loadMarks();
    this.loadModels();
    this.initData(0, 10);
  }

  public loadMarks() {
    this.markService.getAll().subscribe(
      value => {
        this.marks = value;
      }, 
      error => {
        console.log("Error while trying get all marks from database")
      }
    );
  }

  public loadModels() {
    this.modelService.getAll().subscribe(
      value => {
        this.models = value;
      }, 
      error => {
        console.log("Error while trying get all models from database")
      }
    );
  }

  public loadCorrectModels(value: any) {
    this.markService.getAllModelsByMark(value).subscribe(
      value => {
        this.models = value
      },
      error => {
        console.log("Error while trying get all models by mark from database")
      }
    ); 
  }

  public loadOffers(event: any) {
    this.carOfferService.getAll(event.pageIndex, event.pageSize).subscribe(
      value => {
        this.offers = value;
      }, 
      error => {
        console.log("Error while trying get all offers from database")
      }
    );
  }

  public initData(page: number, size: number) {
    this.carOfferService.getAll(page, size).subscribe(
      value => {
        this.offers = value;
        console.log(this.offers);
      }, 
      error => {
        console.log("Error while trying get all offers from database")
      }
    );
  }



}
