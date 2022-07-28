import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TacheProjetInterneService {
  host = this.informationGenerale.baseUrl + "/tacheProjetInternes/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTacheProjetInternes", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(tacheProjetInterne,request): Observable<any> {
    return this.http.post(this.host + "newTacheProjetInterne", request);
  }

  update(id, tacheProjetInterne,request): Observable<any> {
    return this.http.post(`${this.host + "modifierTacheProjetInterne"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTacheProjetInterne" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request);
  }
}
