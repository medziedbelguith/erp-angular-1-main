import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeDirecteService {
  host = this.informationGenerale.baseUrl + "/chargeDirectes/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listChargeDirectes", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(chargeDirecte,request): Observable<any> {
    for (let key in chargeDirecte) {
      request[key] = chargeDirecte[key]
    }
    return this.http.post(this.host + "newChargeDirecte", request);
  }

  update(id, chargeDirecte,request): Observable<any> {
    for (let key in chargeDirecte) {
      request[key] = chargeDirecte[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierChargeDirecte"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteChargeDirecte" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
