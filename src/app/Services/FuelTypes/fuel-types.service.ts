import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelType } from 'src/app/Models/FuelType';

@Injectable({
  providedIn: 'root'
})
export class FuelTypesService {

  private URL: string = 'http://localhost:8080/api/fuel-types/'

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<FuelType>> {
    return this.http.get<Array<FuelType>>(this.URL);
  }
}
