import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private URL: string = "http://localhost:8080/api/image-upload/"

  constructor(private http: HttpClient) { }

  public upload(images: File[], offerId: any) : Observable<string> {
    const formData: FormData = new FormData();

    for  (let image of images) {
      formData.append('files', image);
    }
    
    formData.append('offerId', offerId);
    return this.http.post<string>(this.URL, formData);
  }

  public uploadImagesByLinks(images: Array<String>, offerId: any): Observable<string> {
    return this.http.post<string>(this.URL + 's/', {offerId: offerId, links: images});
  }

  public deleteImagesByOfferId(id: number) : Observable<string> {
    return this.http.delete<string>(this.URL + id);
  }
}
