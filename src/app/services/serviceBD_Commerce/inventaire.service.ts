import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {
  host = this.informationGenerale.baseUrl
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "/inventaires/listInventaires", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "/inventaires/getById2"}/${id}`);
  }

  getById(id): Observable<any> {
    return this.http.get(`${this.host + "/inventaires/getById"}/${id}`);
  }

  create(inventaire,request): Observable<any> {
    return this.http.post(this.host + "/inventaires/newInventaire", request);
  }

  update(id, inventaire,request): Observable<any> {
    for (let key in inventaire) {
      request[key] = inventaire[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "/inventaires/modifierInventaire"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "/inventaires/deleteInventaire" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "/inventaires/getAllParametres"}/${id}`);
  }

  rechercheByCategorie(request): Observable<any> {
    return this.http.post(`${this.host+ "/articles/getArticlesByIdCategorie" }`, request);
  }
}
