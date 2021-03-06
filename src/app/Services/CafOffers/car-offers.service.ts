import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarOffer } from 'src/app/Models/CarOffer';
import { FilteredPage } from 'src/app/Models/FilteredPage';

@Injectable({
  providedIn: 'root'
})
export class CarOffersService {

  private URL: string = 'http://localhost:8080/api/car-offers/';

  constructor(private http: HttpClient) { }

  public getAll(page: number, count: number) : Observable<Array<CarOffer>> {
    return this.http.get<Array<CarOffer>>(this.URL + count + '/page=' + page + '/');
  }

  public getById(id: number) {
    return this.http.get<CarOffer>(this.URL + id);
  }
  
  public filter(params: any, page: number, size: number) : Observable<FilteredPage> {
    return this.http.post<FilteredPage>(this.URL + 'filter/' + size + '/page=' + page, params);
  }

  public add(offer: any) {
    return this.http.post<any>(this.URL, offer);
  }

  public getOffersByUser(id: number) {
    return this.http.get<Array<CarOffer>>(this.URL + id + '/user/');
  }

  public delete(id: number) {
    return this.http.delete<CarOffer>(this.URL + id);
  }

  public update(id: number, updatedOffer: any) {
    return this.http.put<CarOffer>(this.URL + id,  updatedOffer);
  }

  public getNewestOffers() {
    return this.http.get<Array<CarOffer>>(this.URL + 'newest');
  }

}
