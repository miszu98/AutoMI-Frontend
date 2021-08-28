import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from 'src/app/Models/Mark';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  private URL: string = 'http://localhost:8080/api/marks/';

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<Mark>> {
    return this.http.get<Array<Mark>>(this.URL);
  }

}
