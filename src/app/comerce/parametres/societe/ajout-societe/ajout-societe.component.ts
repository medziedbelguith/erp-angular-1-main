import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-ajout-societe',
  templateUrl: './ajout-societe.component.html',
  styleUrls: ['./ajout-societe.component.scss']
})
export class AjoutSocieteComponent implements OnInit {
  societeFormGroup: FormGroup;
  lienAjoute = "/societes/newSociete"
  objectKeys = Object.keys;

  request = {
    raisonSociale:"",
    matriculeFiscale:"",
    responsable:"",
    cinResponable:"",
    telephones:"",
    mobiles:"",
    fax:"",
    email:"",
    pays:"",
    gouvernorat:"",
    delegation:"",
    localite:"",
    codePostale:"",
    adresse:"",
    societeParent:""
  }

  societe = {
    raisonSociale:"",
    matriculeFiscale:"",
    responsable:"",
    cinResponable:"",
    telephones:"",
    mobiles:"",
    fax:"",
    pays:"",
    email:"",
    gouvernorat:"",
    delegation:"",
    localite:"",
    codePostale:"",
    adresse:"",
    societeParent:""
  }

  erreurSociete = {
    raisonSociale:"",
    matriculeFiscale:"",
    responsable:"",
    cinResponable:"",
    telephones:"",
    mobiles:"",
    pays:"",
    fax:"",
    email:"",
    gouvernorat:"",
    delegation:"",
    localite:"",
    codePostale:"",
    adresse:""
  }

  erreurSocieteParent = ""

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getSocietes()
  }

  getSocietes() {
    let request = {page:1, limit:100000, search:[], orderBy:[]}

    this.http.post(this.informationGenerale.baseUrl + "/societes/listSocietes", request).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.societes = resultat.resultat.docs
          this.societes.push({id:"",raisonSociale:"Vide",societeParent:{_id:""}})
        }
      }, err => {
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  controleInputs() {
    for(let key in this.erreurSociete){
      this.erreurSociete[key] = ""
    }
   
    var isValid = true

    for(let key in this.societe){
      if(this.societe[key] == ""){
        this.erreurSociete[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutSociete()
  {   
  /*if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   */

    for(let key in this.societe){
      this.request[key] = this.societe[key]
    }   

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre societe est bien enregistrée !")
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurSociete){
      this.societe[key] = ""
    }
  }

  //autocomplete modele
  keySelectedSociete = "raisonSociale"
  objetSociete = {raisonSociale:""}
  societes = []
  setSocieteID(id){
    this.societe.societeParent = id
  }

  
}
