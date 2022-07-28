import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';


@Injectable({
  providedIn: 'root'
})
export class HistoriqueArticleVenteService {
  host = this.informationGenerale.baseUrl + "/historiqueArticleVentes/";

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listHistoriqueArticleVentes", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
    }
    return this.http.post(this.host + "newHistoriqueArticleVente", request);
  }

  update(id, historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
      if (key == 'id') {
        id = request[key];
      }
    }
    return this.http.post(`${this.host + "modifierHistoriqueArticleVente"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host + "deleteHistoriqueArticleVente"}/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }

  articles(id, request): Observable<any> {
    return this.http.post(this.host + "getByIdArticle", request);
  }
}
