import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TypeTierService {
  host = this.informationGenerale.baseUrl + "/typeTiers/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTypeTiers", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newTypeTier", request);
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierTypeTier"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTypeTier" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }
}
