import { Component, OnInit } from '@angular/core';
import { CarOffer, Color, FuelType } from 'src/app/Models/CarOffer';
import { CarType } from 'src/app/Models/CarType';
import { DrivingGear } from 'src/app/Models/DrivingGear';
import { Gearbox } from 'src/app/Models/Gearbox';
import { Mark } from 'src/app/Models/Mark';
import { Model } from 'src/app/Models/Model';
import { State } from 'src/app/Models/State';
import { CarOffersService } from 'src/app/Services/CafOffers/car-offers.service';
import { ColorsService } from 'src/app/Services/Colors/colors.service';
import { DrivingGearsService } from 'src/app/Services/DrivingGears/driving-gears.service';
import { FuelTypesService } from 'src/app/Services/FuelTypes/fuel-types.service';
import { GearboxesService } from 'src/app/Services/Gearboxes/gearboxes.service';
import { MarksService } from 'src/app/Services/Marks/marks.service';
import { ModelsService } from 'src/app/Services/Models/models.service';
import { ShareDataService } from 'src/app/Services/ShareData/share-data.service';
import { TokenStorageService } from 'src/app/Services/TokenStorage/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  carTypes: Array<CarType> = [
    {name: 'COUPE', id: 0},
    {name: 'SEDAN', id: 1},
    {name: 'WAGON', id: 2},
    {name: 'HATCHBACK', id: 3},
    {name: 'TRUCK', id: 4},
    {name: 'SUV', id: 5},
    {name: 'CABRIOLET', id: 6},
    {name: 'MINIVAN', id: 7},
    {name: 'COMPACT', id: 8}
  ]

  carStates: Array<State> = [
    {name: 'BRAND_NEW', id: 0}, 
    {name: 'USED', id: 1}, 
    {name: 'DAMAGED', id: 2}
  ]

  title = 'AutoMI';
  showMenu = false;

  declare marks: Array<Mark>;
  declare models: Array<Model>;
  declare offers: Array<CarOffer>;
  declare colors: Array<Color>;
  declare gearboxes: Array<Gearbox>;
  declare fuelTypes: Array<FuelType>;
  declare drivingGears: Array<DrivingGear>;

  size: number = 10;
  page: number = 0;


  params = new Map<string, number>();

  

  constructor(
    private markService: MarksService,
    private modelService: ModelsService,
    private carOfferService: CarOffersService,
    private colorService: ColorsService,
    private gearboxesService: GearboxesService,
    private fuelTypesService: FuelTypesService,
    private drivingGearService: DrivingGearsService,
    private shareDataService: ShareDataService,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.loadMarks();
    this.loadModels();
    this.filter({});
    this.loadColors();
    this.loadGearboxes();
    this.loadFuelTypes();
    this.loadDrivingGears();

    setTimeout(() => this.trigerMenu(), 150);
  }

  public trigerMenu() {
    let element = document.getElementById('toggle');
    element?.click();
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

  public loadMarks() {
    this.markService.getAll().subscribe(
      value => {
        this.marks = value;
      }, 
      error => {
        console.log("Error while trying get all marks from database");
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
    this.markService.getAllModelsByMark(value.mark).subscribe(
      respone => {
        this.models = respone;
        this.updateFilter('mark', value);
      },
      error => {
        console.log("Error while trying get all models by mark from database");
      }
    ); 
  }

  public updateFilter(name: string, param: any) {
      this.params.set(name, param.id);
      let json : { [key: string]: number } = {};
      this.params.forEach((value, key) => {
        json[key] = value;
      });
      this.filter(json);
      console.log(json)
  }

  // public loadOffers(event: any) {
  //   this.carOfferService.getAll(event.pageIndex, event.pageSize).subscribe(
  //     value => {
  //       this.offers = value;
  //     }, 
  //     error => {
  //       console.log("Error while trying get all offers from database");
  //     }
  //   );
  // }

  public loadColors() {
    this.colorService.getAll().subscribe(
      value => {
        this.colors = value;
      },
      error => {
        console.log("Error while trying get all colors from database");
      }
    );
  }

  public loadGearboxes() {
    this.gearboxesService.getAll().subscribe(
      value => {
        this.gearboxes = value;
      },
      error => {
        console.log("Error while trying get all gearboxes from database");
      }
    );
  }

  public loadFuelTypes() {
    this.fuelTypesService.getAll().subscribe(
      value => {
        this.fuelTypes = value;
      },
      error => {
        console.log("Error while trying get all fuel types from database");
      }
    );
  }

  public loadDrivingGears() {
    this.drivingGearService.getAll().subscribe(
      value => {
        this.drivingGears = value;
      }, 
      error => {
        console.log("Error while trying get all driving gears from database");
      }
    );
  }

  // public initData(page: number, size: number) {
  //   this.carOfferService.getAll(page, size).subscribe(
  //     value => {
  //       this.offers = value;
  //     }, 
  //     error => {
  //       console.log("Error while trying get all offers from database");
  //     }
  //   );
  // }


  public filter(params: any) {
    this.carOfferService.filter(params, this.page, this.size).subscribe(
      value => {
        this.offers = value;
      },
      error => {
        console.log("błąd filtrowania");
      }
    );
  }

  public loadPaginationData(event: any) {
    this.size = event.pageSize;
    this.page = event.pageIndex;

    let json: {[key: string]: number} = {};
    this.params.forEach((value, key) => {
      json[key] = value;
    });

    this.carOfferService.filter(json, this.page, this.size).subscribe(
      value => {
        this.offers = value;
      }, 
      error => {
        console.log("Error while trying get all offers from database");
      }
    );
  }

  public clearFilters() {
    this.params = new Map<string, number>();
    this.filter({});
  }

}
