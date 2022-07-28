import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  host = this.informationGenerale.baseUrl + "/personnels/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listPersonnels", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(personnel,request): Observable<any> {
    return this.http.post(this.host + "newPersonnel", request);
  }

  update(id, personnel,request): Observable<any> {
    for (let key in personnel) {
      request[key] = personnel[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    console.log(request)
    return this.http.post(`${this.host + "modifierPersonnel"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deletePersonnel" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
