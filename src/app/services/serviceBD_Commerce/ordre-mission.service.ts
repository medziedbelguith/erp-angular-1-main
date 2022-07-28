import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {
  host = this.informationGenerale.baseUrl + "/ordreEmissions/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listOrdreEmissions", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(ordreMission,request): Observable<any> {
    return this.http.post(this.host + "newOrdreEmission", request);
  }

  update(id, ordreMission,request): Observable<any> {
    return this.http.post(`${this.host + "modifierOrdreEmission"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteOrdreEmission" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request);
  }
}
