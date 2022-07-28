import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class FraisService {
  host = this.informationGenerale.baseUrl + "/fraiss/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listFrais", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(frais,request): Observable<any> {
    return this.http.post(this.host + "newFrais", request);
  }

  update(id, frais,request): Observable<any> {
    return this.http.post(`${this.host + "modifierFrais"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteFrais" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host+ "getAllParametres",request);
  }
}
