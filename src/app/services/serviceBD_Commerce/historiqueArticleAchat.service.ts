import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';


@Injectable({
  providedIn: 'root'
})
export class HistoriqueArticleAchatService {
  host = this.informationGenerale.baseUrl + "/historiqueArticleAchats/";

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listHistoriqueArticleAchats", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
    }
    return this.http.post(this.host + "newHistoriqueArticleAchat", request);
  }

  update(id, historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
      if (key == 'id') {
        id = request[key];
      }
    }
    return this.http.post(`${this.host + "modifierHistoriqueArticleAchat"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host + "deleteHistoriqueArticleAchat"}/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`);
  }

  articles(id, request): Observable<any> {
    return this.http.post(this.host + "getByIdArticle", request);
  }
}
