import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from 'src/app/Models/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private URL: string = 'http://localhost:8080/api/models/';

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Array<Model>> {
    return this.http.get<Array<Model>>(this.URL);
  }
  
}
