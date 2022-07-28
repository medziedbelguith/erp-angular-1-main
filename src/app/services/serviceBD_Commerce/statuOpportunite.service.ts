import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class StatuOpportuniteService {
  host = this.informationGenerale.baseUrl + "/statuOpportunites/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listStatuOpportunites", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newStatuOpportunite", request);
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierStatuOpportunite"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteStatuOpportunite" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }
}
