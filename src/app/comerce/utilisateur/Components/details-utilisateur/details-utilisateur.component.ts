
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ApiUtilisateurService } from 'src/app/services/serviceBD_Comerce/api-utilisateur-services/api-utilisateur.service';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent implements OnInit {
  lienGetById = "/utilisateurs/getById/"

  objectKeys = Object.keys;

  @Output() closeModalModifierUtilisateur = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierUtilisateur = false

  closeModifierUtilisateur(){
    this.closeModalModifierUtilisateur.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierUtilisateur == true){
      if (this.id.length > 1) {
        this.getUtilisateur(this.id)
      }
    }
  }

  request = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  utilisateur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  roles = []

  isLoading = false

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private apiUtilisateurServices:ApiUtilisateurService) {
    
  }

  getUtilisateur(id) {
    this.isLoading = true
    
    this.apiUtilisateurServices.getUser(id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.utilisateur) {
            this.utilisateur[key] = this.request[key]
            this.getAllParametres()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
   
  }

  getAllParametres(){
    this.isLoading = true
    let request = {societe:this.informationGenerale.idSocieteCurrent}

    this.apiUtilisateurServices.getAllParametres(request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.roles = resultat.roles
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
      
    );

  }

  getRole(id){
    if(this.roles.filter(x => x.id == id).length > 0){
      return this.roles.filter(x => x.id == id)[0].nom
    }
  }

}
