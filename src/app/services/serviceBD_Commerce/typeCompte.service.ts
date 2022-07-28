import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TypeCompteService {
  host = this.informationGenerale.baseUrl + "/typeComptes/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTypeComptes", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newTypeCompte", request);
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierTypeCompte"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTypeCompte" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }
}
