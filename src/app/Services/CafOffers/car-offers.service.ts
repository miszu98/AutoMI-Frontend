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

  public getAll(page: number, count: number) : Observable<Array<CarOffer>> {
    return this.http.get<Array<CarOffer>>(this.URL + count + '/page=' + page + '/');
  }
  
  public filter(params: any, page: number, size: number) : Observable<Array<CarOffer>> {
    return this.http.post<Array<CarOffer>>(this.URL + 'filter/' + size + '/page=' + page, params);
  }

  public create() {
    
  }

}
