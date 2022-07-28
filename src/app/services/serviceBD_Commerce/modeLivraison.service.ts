import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ModeLivraisonService {
  host = this.informationGenerale.baseUrl + "/modeLivraisons/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listModeLivraisons", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newModeLivraison", request);
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierModeLivraison"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteModeLivraison" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }
}
