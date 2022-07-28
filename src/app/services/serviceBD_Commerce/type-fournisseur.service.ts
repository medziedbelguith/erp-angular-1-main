import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TypeFournisseurService {
  host = this.informationGenerale.baseUrl + "/typeFournisseurs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTypeFournisseurs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(typeFournisseur,request): Observable<any> {
    for (let key in typeFournisseur) {
      request[key] = typeFournisseur[key]
    }
    return this.http.post(this.host + "newTypeFournisseur", request);
  }

  update(id, typeFournisseur,request): Observable<any> {
    for (let key in typeFournisseur) {
      request[key] = typeFournisseur[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierTypeFournisseur"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTypeFournisseur" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
