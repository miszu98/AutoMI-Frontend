import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarOffer } from 'src/app/Models/CarOffer';

@Injectable({
  providedIn: 'root'
})
export class CarOffersService {

  private URL: string = 'http://localhost:8080/api/car-offers/';

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<CarOffer>> {
    return this.http.get<Array<CarOffer>>(this.URL);
  }
  

}
