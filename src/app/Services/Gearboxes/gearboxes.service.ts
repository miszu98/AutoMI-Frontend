import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gearbox } from 'src/app/Models/Gearbox';

@Injectable({
  providedIn: 'root'
})
export class GearboxesService {

  private URL: string = 'http://localhost:8080/api/gearbox/'

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<Gearbox>> {
    return this.http.get<Array<Gearbox>>(this.URL);
  }
}
