import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CarOffer, Color, DrivingGear, FuelType, Gearbox } from 'src/app/Models/CarOffer';
import { CarType } from 'src/app/Models/CarType';
import { Image } from 'src/app/Models/Image';
import { ImageSource } from 'src/app/Models/ImageSource';
import { Mark } from 'src/app/Models/Mark';
import { Model } from 'src/app/Models/Model';
import { State } from 'src/app/Models/State';
import { CarOffersService } from 'src/app/Services/CafOffers/car-offers.service';
import { ColorsService } from 'src/app/Services/Colors/colors.service';
import { DrivingGearsService } from 'src/app/Services/DrivingGears/driving-gears.service';
import { FuelTypesService } from 'src/app/Services/FuelTypes/fuel-types.service';
import { GearboxesService } from 'src/app/Services/Gearboxes/gearboxes.service';
import { ImagesService } from 'src/app/Services/Images/images.service';
import { MarksService } from 'src/app/Services/Marks/marks.service';
import { ModelsService } from 'src/app/Services/Models/models.service';
import { ShareDataService } from 'src/app/Services/ShareData/share-data.service';
import { TokenStorageService } from 'src/app/Services/TokenStorage/token-storage.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  
  title = "AutoMI";

  panelOpenState = false;

  // disabled = true;
  // btnDisabled = true;

  selectedTabIndex = 0;

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

  page =  0;
  size = 100;
  index = 0;

  images: Array<File> = [];
  // imagesLocalUrls: Array<string | ArrayBuffer | null> = [];
  imagesLocalUrls: Array<ImageSource> = [];

  imagesLimit = 15;
  currentReadedImages = 0;
  currentImages = 0;
  imgError = false;
  imgErrorMessage = '';
  imgStringUrls: Array<Image> = [];

  declare marks: Array<Mark>;
  declare models: Array<Model>;
  declare offers: Array<CarOffer>;
  declare colors: Array<Color>;
  declare gearboxes: Array<Gearbox>;
  declare fuelTypes: Array<FuelType>;
  declare drivingGears: Array<DrivingGear>;

  declare userOffers: Array<CarOffer>;

  params = new Map<string, number>();

  offerForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)]),
    price: new FormControl('', Validators.required),
    power: new FormControl('', Validators.required),
    engineCapacity: new FormControl('', Validators.required),
    mileage: new FormControl('', Validators.required),
    yearOfProduction: new FormControl('',  Validators.required),
    mark: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    typeOfFuel: new FormControl('', Validators.required),
    typeOfVehicle: new FormControl('', Validators.required),
    gearbox: new FormControl('', Validators.required),
    drivingGear: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required)
  })

  constructor(
    private markService: MarksService,
    private modelService: ModelsService,
    private carOfferService: CarOffersService,
    private colorService: ColorsService,
    private gearboxesService: GearboxesService,
    private fuelTypesService: FuelTypesService,
    private drivingGearService: DrivingGearsService,
    private shareDataService: ShareDataService,
    private tokenStorageService: TokenStorageService,
    private imageUploaderService: ImagesService,
    ) { }

  ngOnInit(): void { 
    this.loadMarks();
    this.loadModels();
    this.loadColors(); 
    this.loadGearboxes();
    this.loadFuelTypes();
    this.loadDrivingGears();
    this.loadUserOffers();
    setTimeout(() => this.trigerMenu(), 150);
  }

  // public edit() {
  //   if (this.disabled) {
  //     for (const field in this.offerForm.controls) { 
  //       this.offerForm.controls[field].disable();
  //     }
  //     this.btnDisabled = true;
  //   } else {
  //     for (const field in this.offerForm.controls) { 
  //       this.offerForm.controls[field].enable();
  //     }
  //     this.btnDisabled = false;
  //   }
  //   this.disabled = !this.disabled;
  // }

  public deleteImageFromLoadedOffer(url: string) {
    let object = this.imgStringUrls.find(x => x.url === url);
    if (object != undefined) {
      this.imgStringUrls.splice(this.imgStringUrls.indexOf(object), 1);
      this.currentReadedImages--;
    }
  }

  public deleteImageFromUploaded(id: number) {
    let object = this.imagesLocalUrls.find(x => x.id === id);
    let file = this.images.find(x => x.name == object?.file.name);

    if (object != undefined && file !== undefined) {
      let indexToDelete = this.imagesLocalUrls.indexOf(object);
      this.imagesLocalUrls.splice(indexToDelete, 1);

      let indexToDeleteFile = this.images.indexOf(file);
      this.images.splice(indexToDeleteFile, 1);

      this.currentImages--;
    }
  }

  public delete(id: number) {
    this.carOfferService.delete(id).subscribe(
      value => {
        console.log("Offer with id: " + id + " deleted");
      }, 
      error => {
        console.log(error);
      }
    );
  }

  public closeAll() {
    let closeAll = document.getElementById('close') as HTMLElement;
    closeAll?.click();
  }

  public cleanForm() {
    this.closeAll();
    if (this.selectedTabIndex == 1) {
      for (const field in this.offerForm.controls) { 
        this.offerForm.get(field)?.setValue('');
        this.offerForm.get(field)?.markAsUntouched();
      }
    }
  }

  public loadData(id: number) {
    this.panelOpenState = true;

    let offer = this.getOffer(id);
    
    setTimeout(() => {
      this.imgStringUrls = offer.images;
      this.currentReadedImages = 0;
      this.currentReadedImages += this.imgStringUrls.length;
      
      this.offerForm.get('title')?.setValue(offer.title);
      this.offerForm.get('city')?.setValue(offer.city);
      this.offerForm.get('description')?.setValue(offer.description);
      this.offerForm.get('price')?.setValue(offer.price);
      this.offerForm.get('engineCapacity')?.setValue(offer.car.engineCapacity);
      this.offerForm.get('mileage')?.setValue(offer.car.mileage);
      this.offerForm.get('yearOfProduction')?.setValue(offer.car.yearOfProduction);
      this.offerForm.get('power')?.setValue(offer.car.power);
      this.offerForm.get('mark')?.setValue(offer.car.mark.id);
      this.offerForm.get('model')?.setValue(offer.car.model.id);
      this.offerForm.get('typeOfFuel')?.setValue(offer.car.fuelType.id);
      this.offerForm.get('gearbox')?.setValue(offer.car.gearbox.id);
      this.offerForm.get('drivingGear')?.setValue(offer.car.drivingGear.id);
      this.offerForm.get('state')?.setValue(offer.car.state);
      this.offerForm.get('typeOfVehicle')?.setValue(offer.car.carType);
      this.offerForm.get('color')?.setValue(offer.car.color.id);

      this.loadCorrectModelsById(offer.car.mark.id);
    }, 150)

   
  }
  
  public getOffer(id: number) {
    let foundedOffer = this.userOffers.filter(offer => offer.id === id)[0];
    console.log(foundedOffer)
   return foundedOffer;
  }

  // public disableForm(state: boolean) {
  //   this.disable = state;
  //   if (this.disable) {
  //     for (const field in this.offerForm.controls) { 
  //       this.offerForm.get(field)?.disabled;
  //     }
  //   } else {
  //     for (const field in this.offerForm.controls) { 
  //       this.offerForm.get(field)?.enabled;
  //     }
  //   }
  // }

  public loadUserOffers() {
    let userId = this.tokenStorageService.getUser().id;
    this.carOfferService.getOffersByUser(userId).subscribe(
      value => {
        this.userOffers = value;
      },
      error => {
        console.log(error);
      }
    );
  }

  public getTitleErrorMessage() {
    let field = this.offerForm.get('title');
    if (field?.hasError('required')) {
      return 'You must enter value';
    } 
    if (!field?.errors?.minLength) {
      return 'Min length is 4';
    } 
    return '';
  }

  public getCityErrorMessage() {
    let field = this.offerForm.get('city');
    if (field?.hasError('required')) {
      return 'You must enter value';
    } 
    if (!field?.errors?.minLength) {
      return 'Min length is 3';
    } 
    return '';
  }

  public getCarDetailError(field: string) {
    let _field = this.offerForm.get(field);
    if (_field?.hasError('required')) {
      return 'You must enter value';
    }
    return '';
  }

  public onSubmit() {
    let form = this.offerForm;
    let userId = this.tokenStorageService.getUser().id;

    if (this.images.length == 0) {
      this.imgError = true;
      this.imgErrorMessage = "You can't create offer with 0 images";
      return;
    } else {
      this.imgError = false;
    }

    if (form.invalid) {
      form.markAsTouched();
    } else {
      let offer = {
        title: form.get('title')?.value,
        description: form.get('description')?.value,
        price: form.get('price')?.value,
        car: {
          power: form.get('power')?.value,
          engineCapacity: form.get('engineCapacity')?.value,
          mileage: form.get('mileage')?.value,
          yearOfProduction: form.get('yearOfProduction')?.value,
          mark: {
            id: form.get('mark')?.value.id
          },
          model: {
            id: form.get('model')?.value.id
          },
          fuelType: {
            id: form.get('typeOfFuel')?.value.id
          },
          gearbox: {
            id: form.get('gearbox')?.value.id
          },
          drivingGear: {
            id: form.get('drivingGear')?.value.id
          },
          state: form.get('state')?.value.id,
          carType: form.get('typeOfVehicle')?.value.id,
          color: {
            id: form.get('color')?.value.id
          },
        },
        user: {
          id: userId,
        }, 
        city: form.get('city')?.value,
      };
  
      this.carOfferService.add(offer).subscribe(
        value => {
          let offerId = value.id;
          this.imageUploaderService.upload(this.images, offerId).subscribe(
            value => {
              console.log(value);
            },
            error => {
              console.log(error);
            }
          )
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public offerToUpdate(carId: number, userId: number) {
    let form = this.offerForm;
    return {
      title: form.get('title')?.value,
      description: form.get('description')?.value,
      price: form.get('price')?.value,
      car: {
        id: carId,
        power: form.get('power')?.value,
        engineCapacity: form.get('engineCapacity')?.value,
        mileage: form.get('mileage')?.value,
        yearOfProduction: form.get('yearOfProduction')?.value,
        mark: {
          id: form.get('mark')?.value
        },
        model: {
          id: form.get('model')?.value
        },
        fuelType: {
          id: form.get('typeOfFuel')?.value
        },
        gearbox: {
          id: form.get('gearbox')?.value
        },
        drivingGear: {
          id: form.get('drivingGear')?.value
        },
        state: form.get('state')?.value,
        carType: form.get('typeOfVehicle')?.value,
        color: {
          id: form.get('color')?.value
        },
      },
      user: {
        id: userId,
      }, 
      city: form.get('city')?.value,
    };
  }

  public updateOffer(oldOffer: CarOffer) {
    let form = this.offerForm;
    let userId = this.tokenStorageService.getUser().id;

    let condition = this.images.length == 0 && this.imgStringUrls.length == 0;

    if (condition) {
      this.imgError = true;
      this.imgErrorMessage = "You can't create offer with 0 images";
    } else {
      this.imgError = false;
    }

    if (form.invalid) {
      form.markAsTouched();
    } else if (form.valid && !condition) {
      let offer = this.offerToUpdate(oldOffer.car.id, userId);

      this.carOfferService.update(oldOffer.id, offer).subscribe(
        value => {
          let offerId = value.id;
          
          this.clearImagesBeforeUpdate(offerId);

          this.uploadImages(this.images, offerId);
          
          this.uploadImagesByLinks(offerId);

          setTimeout(() => this.reloadPage(), 5000);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public reloadPage() {
    window.location.reload();
  }

  public clearImagesBeforeUpdate(offerId: number) {
    this.imageUploaderService.deleteImagesByOfferId(offerId).subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  public uploadImages(images: File[], offerId: number) {
    if (this.images.length != 0) {
      this.imageUploaderService.upload(this.images, offerId).subscribe(
        value => {
          console.log(value);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  public uploadImagesByLinks(offerId: number) {
    if (this.imgStringUrls.map(img => img.url).length != 0) {
      this.imageUploaderService.uploadImagesByLinks(this.imgStringUrls.map(img => img.url), offerId).subscribe(
        value => {
          console.log(value);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public onFileChanged(event: any) {
    let imgs = event.target.files;
    if (this.imgStringUrls.length + (imgs.length + this.images.length) > this.imagesLimit) {
      this.imgError = true;
      this.imgErrorMessage = "You can't add more images than limit";
    } else {
      this.imgError = false;
      this.imgErrorMessage = '';
      for (let image of event.target.files) {
        this.images.push(image);
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (_event) => {
          this.imagesLocalUrls.push({id: this.index, source: reader.result, file: image});
          this.index++;
        }
      }
      this.currentImages = this.images.length;
    }
  }

  public trigerMenu() {
    let element = document.getElementById('toggle');
    element?.click();
  }

  public getLoggedIn(): string | null {
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

  public loadCorrectModelsByName(value: any) {
    this.markService.getAllModelsByMark(value.mark).subscribe(
      respone => {
        this.models = respone;
      },
      error => {
        console.log("Error while trying get all models by mark from database");
      }
    ); 
  }

  public loadCorrectModelsById(value: any) {
    this.markService.getAllModelsByMarkId(value).subscribe(
      respone => {
        this.models = respone;
      },
      error => {
        console.log("Error while trying get all models by mark from database");
      }
    ); 
  }

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
}
