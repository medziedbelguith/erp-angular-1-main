import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionReglementService {
  host = this.informationGenerale.baseUrl + "/conditionReglements/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listConditionReglements", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(conditionReglement,request): Observable<any> {
    for (let key in conditionReglement) {
      request[key] = conditionReglement[key]
    }
    return this.http.post(this.host + "newConditionReglement", request);
  }

  update(id, conditionReglement,request): Observable<any> {
    for (let key in conditionReglement) {
      request[key] = conditionReglement[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierConditionReglement"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteConditionReglement" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
