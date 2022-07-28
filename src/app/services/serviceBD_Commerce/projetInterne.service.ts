import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetInterneService {
  host = this.informationGenerale.baseUrl + "/projetInternes/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listProjetInternes", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(projetInterne,request): Observable<any> {
    return this.http.post(this.host + "newProjetInterne", request);
  }

  update(id, projetInterne,request): Observable<any> {
    return this.http.post(`${this.host + "modifierProjetInterne"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteProjetInterne" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request);
  }
}
