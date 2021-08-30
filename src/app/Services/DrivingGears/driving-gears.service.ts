import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DrivingGear } from 'src/app/Models/DrivingGear';

@Injectable({
  providedIn: 'root'
})
export class DrivingGearsService {

  private URL: string = 'http://localhost:8080/api/driving-gears/';

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<DrivingGear>> {
    return this.http.get<Array<DrivingGear>>(this.URL);
  }
}
