import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class BonTravailService {
  host = this.informationGenerale.baseUrl + "/bonTravails/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listBonTravails", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(bonTravail,request): Observable<any> {
    return this.http.post(this.host + "newBonTravail", request);
  }

  update(id, bonTravail,request): Observable<any> {
    return this.http.post(`${this.host + "modifierBonTravail"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteBonTravail" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request);
  }
}
