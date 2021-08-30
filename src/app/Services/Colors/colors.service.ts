import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/Models/Color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private URL: string = 'http://localhost:8080/api/colors/'

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<Color>> {
    return this.http.get<Array<Color>>(this.URL);
  }
}
