import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from 'src/app/Models/Mark';
import { Model } from 'src/app/Models/Model';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  private URL: string = 'http://localhost:8080/api/marks/';

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<Mark>> {
    return this.http.get<Array<Mark>>(this.URL);
  }

  public getAllModelsByMark(mark: string) : Observable<Array<Model>> {
    return this.http.get<Array<Model>>(this.URL + mark + '/name');
  }

  public getAllModelsByMarkId(id: number) : Observable<Array<Model>> {
    return this.http.get<Array<Model>>(this.URL + id);
  }
}
