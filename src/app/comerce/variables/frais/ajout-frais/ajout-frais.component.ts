import { FraisService } from './../../../../services/serviceBD_Commerce/frais.service';
import { Frais } from './../../../../model/modelCommerce/frais';
import { Component, OnInit,  Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';

import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-frais',
  templateUrl: './ajout-frais.component.html',
  styleUrls: ['./ajout-frais.component.scss']
})
export class AjoutFraisComponent implements OnInit {

  fraisFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = new Frais()

  frais = new Frais()

  erreurFrais = {
    type:"",
  }

  @Output() closeModalAjoutFrais = new EventEmitter<string>();

  @Input() isPopup = false

  closeAjoutFrais(){
    this.closeModalAjoutFrais.emit();
  }
  
  constructor(
    private notificationToast:ToastNotificationService, 
    private router: Router,
    public informationGenerale: InformationsService,
    private fraisServ : FraisService,
    private fnctModel:FnctModelService) {
      this.getAllParametres()
     }

  ngOnInit(): void {
  }
  
  allFraiss = []
  tabTypes = []
  getAllParametres(){
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent       
    this.fraisServ.parametre(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allFraiss = resultat.fraiss 
          for (let item of this.allFraiss) {
            this.tabTypes.push(item.type)
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème ggg de connexion internet")
      });
  }

  isLoading = false
  ajoutFrais()
  {   
    if (!this.fnctModel.controleInputs(this.erreurFrais, this.frais, this.tabTypes, 'type')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.frais){
      this.request[key] = this.frais[key]
    }   
    this.request.societe = this.informationGenerale.idSocieteCurrent       
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.fraisServ.create(this.frais, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat)
          this.notificationToast.showSuccess("Votre frais est bien enregistrée !")
          this.router.navigate(['variable/frais/list']);
          this.closeAjoutFrais()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }
  
  reseteFormulaire(){
    for(let key in this.erreurFrais){
      this.frais[key] = ""
    }
  }

  clickDirect(){
    if(this.frais.direct == "oui"){
      this.frais.direct = "non"
    }else{
      this.frais.direct = "oui"
    }
  }

}
