import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class SessionCaisseService {
  host = this.informationGenerale.baseUrl + "/sessionCaisses/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listSessionCaisses", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newSessionCaisse", request);
  }

  update(id,request): Observable<any> {
    return this.http.post(`${this.host + "modifierSessionCaisse"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteSessionCaisse" }/${id}`, {});
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request);
  }
  
  reglements(request): Observable<any> {
    return this.http.post(this.host+ "/reglements", request);
  }  

  charges(request): Observable<any> {
    return this.http.post(this.host+ "/charges", request);
  }
  
  utilisateur(id): Observable<any> {
    return this.http.get(`${this.host + "utilisateur"}/${id}`);
  }
}
