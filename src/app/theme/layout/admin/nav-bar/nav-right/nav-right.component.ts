import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  user:any = {nom:"", prenom:"", role:{libelle:""}}

  constructor(private http: HttpClient, public informationsService : InformationsService , public tokenStorageService: TokenStorageService) { 
    this.user = this.tokenStorageService.getUser()
    this.getSocietes()
  }

  societes = []

  getSocietes() {
    console.log(this.tokenStorageService.getHeader())
    this.http.get(this.informationsService.baseUrl + "/societes/allSocietesUtilisateur", this.tokenStorageService.getHeader()).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat.societes)
          this.societes = resultat.societes
        }
      }, err => {
      }

    );
  }

  ngOnInit() { }
}
