import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-reglement-fournisseur',
  templateUrl: './modifier-reglement-fournisseur.component.html',
  styleUrls: ['./modifier-reglement-fournisseur.component.scss']
})
export class ModifierReglementFournisseurComponent implements OnInit {

  societeFormGroup: FormGroup;
  
  lienModifie = "/reglementFournisseurs/modifierReglementFournisseur/"
  lienGetById = "/reglementFournisseurs/getById/"

  id="";

  objectKeys = Object.keys;
  
  typeTier
  typeTierClient = "Client"
  typeTierFournisseur = "Fournisseur"

  isEqualTypeTier(newTypeTier){
     if(newTypeTier == this.typeTier){
       return true
     }
     return false
  }

  getReglement(id) {
    
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.reglement) {
            this.reglement[key] = this.request[key]
          }
 
          this.reglement.dateEcheance = formatDate(new Date(this.request.dateEcheance), 'yyyy-MM-dd', 'en')
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  setTypeTier(newTypeTier){
    this.typeTier = newTypeTier
  }

  request = {
    fournisseur:"",
    modeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:new Date(),
    numCheque:"",
    dateEcheance:"",
    notes:"",
    societe:""
  }

  reglement = {
    fournisseur:"",
    modeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:new Date(),
    numCheque:"",
    dateEcheance:"",
    notes:"",
    societe:""
  }

  erreurReglement = {
    modeReglement:"",
    montant:"",
    client:"",
    fournisseur:"",
  }

  
  allClients = []
  allFournisseurs = []
  allModeReglements = []

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient,
    private route: ActivatedRoute, 
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
    this.typeTier =  this.typeTierClient
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getReglement(this.id)
    }

  }

  getAllParametres() {
    this.http.get(this.informationGenerale.baseUrl + "/reglements/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allClients = resultat.clients
          this.allFournisseurs = resultat.fournisseurs
          this.allModeReglements = resultat.modeReglements
        }
      }, err => {
        console.log(err)
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  controleInputs() {
    for(let key in this.erreurReglement){
      this.erreurReglement[key] = ""
    }
   
    var isValid = true

    if(this.reglement.modeReglement == ""){
       this.erreurReglement.modeReglement = "Veuillez remplir ce champ"
       isValid = false
    }

    if(this.reglement.montant == 0){
      this.erreurReglement.montant = "Veuillez remplir ce champ"
      isValid = false
    }
     
   
    if(this.reglement.fournisseur == ""){
      this.erreurReglement.fournisseur = "Veuillez remplir ce champ"
      isValid = false
    }
   
    return isValid
  }

  isLoading = false

  ajoutReglement()
  {   
    
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   

    for(let key in this.reglement){
      this.request[key] = this.reglement[key]
    }
   
    this.request.dateReglement = new Date()  

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre reglement est bien enregistrée !")
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurReglement){
      this.reglement[key] = ""
    }
  }

 
  
  //autocomplete Fournisseur
  keySelectedFournisseur = "raisonSociale"
  objetFournisseur = {raisonSociale:""}
  setFournisseurID(id){
    this.reglement.fournisseur = id
  }

  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {libelle:""}
  setModeReglementID(id){
    this.reglement.modeReglement = id
  }
}

