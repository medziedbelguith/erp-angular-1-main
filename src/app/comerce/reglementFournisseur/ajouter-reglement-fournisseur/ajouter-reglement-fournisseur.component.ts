import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ajouter-reglement-fournisseur',
  templateUrl: './ajouter-reglement-fournisseur.component.html',
  styleUrls: ['./ajouter-reglement-fournisseur.component.scss']
})
export class AjouterReglementFournisseurComponent implements OnInit {

  societeFormGroup: FormGroup;
  lienAjoute = "/reglementFournisseurs/newReglementFournisseur"
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
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
    this.reglement.modeReglement = this.informationGenerale.modeReglCurrent
    this.typeTier =  this.typeTierClient
  }

  getAllParametres() {
    this.http.get(this.informationGenerale.baseUrl + "/reglements/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allClients = resultat.clients
          this.allFournisseurs = resultat.fournisseurs
          this.allModeReglements = resultat.modeReglements
          console.log(resultat)
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

    this.request.dateReglement = new Date(formatDate(new Date(), 'yyyy-MM-dd', 'en'))  
    
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

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
  objetFournisseur = {
    email:"active",
    telephone:"active",
    code:"active",
    raisonSociale:"active",
    matriculeFiscale:"active",
    classement:"active",
    plafondCredit:"active",
    mobiles:"active",
    siteWeb:"active",
    conditionReglement:"active",
    typeTiers:"active",
    credit:"active",
    fax:"active",
    statusProspection:"active",
    modeReglement:"active"
  }
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

