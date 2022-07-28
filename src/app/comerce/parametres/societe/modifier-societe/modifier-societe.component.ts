import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-societe',
  templateUrl: './modifier-societe.component.html',
  styleUrls: ['./modifier-societe.component.scss']
})
export class ModifierSocieteComponent implements OnInit {
  societeFormGroup: FormGroup;

  lienModifie = "/societes/modifiersociete/"
  lienGetById = "/societes/getById/"

  id="";
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
  
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, private notificationToast:ToastNotificationService) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  societes = []

  getSocietes() {
    let request = {page:1, limit:100000, search:[], orderBy:[]}

    this.http.post(this.informationGenerale.baseUrl + "/societes/listSocietes", request).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.societes = resultat.resultat.docs.filter(x => x.id != this.id)
          this.societes.push({id:"",raisonSociale:"Vide",societeParent:{_id:""}})
        }
      }, err => {
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  getSociete(id) {
    
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.societe) {
            this.societe[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getSociete(this.id)
      this.getSocietes()
    }
    
  }

  controleInputs() {
    for (let key in this.erreurSociete) {
      this.erreurSociete[key] = ""
    }

    var isValid = true

    for (let key in this.erreurSociete) {
      if (this.societe[key] == "") {
        this.erreurSociete[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }

  isLoading = false

  modifierSociete() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.societe) {
      this.request[key] = this.societe[key]
    }

    if (this.isLoading) {
      return
    }

    if(this.request.societeParent == ""){
      this.request.societeParent = null
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre societe est bien modifiée !")
  
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurSociete) {
      this.societe[key] = ""
    }
  }

  //autocomplete modele
  keySelectedSociete = "raisonSociale"
  objetSociete = {raisonSociale:""}
  setSocieteID(id){
    if(this.controleSociete(id)){
      this.societe.societeParent = id
    }else{
      this.societe.societeParent = ""
    }
  }

  controleSociete(id){
    
    this.erreurSocieteParent = ""

   if(id.length < 5){
      return true
    }
    
    var elements = this.societes.filter(x => x.id == id)
    if(elements.length > 0){
      var element = elements[0]
      while(element.societeParent){
        if(element.id.length < 5){
          return true
        }
        
        console.log(element)
        if(element.societeParent._id == this.id){
          this.erreurSocieteParent = "Veuillez modifier le parent de société !!"
          return false
        }else{
          elements = this.societes.filter(x => x.id == element.societeParent._id)
          if(elements.length > 0){
            element = elements[0]    
          }else{
            return true
          }
        }
      }
    }else{
      return false
    }
    
    return true
  }

}
