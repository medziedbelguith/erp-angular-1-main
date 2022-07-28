import { TransporteurService } from './../../../services/serviceBD_Commerce/transporteur.service';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Transporteur } from 'src/app/model/modelCommerce/transporteur';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-transporteur',
  templateUrl: './ajout-transporteur.component.html',
  styleUrls: ['./ajout-transporteur.component.scss']
})
export class AjoutTransporteurComponent implements OnInit {
  transporteurFormGroup: FormGroup;
  lienAjoute = "/transporteurs/newTransporteur"
  objectKeys = Object.keys;

  @Output() closeModalAjoutTransporteur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutTransporteur = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutTransporteur == true){
      for (let key in this.erreurTransporteur) {
        this.erreurTransporteur[key] = ""
        if(document.getElementById(key) != null){
           document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.transporteur) {
        this.transporteur[key] = ""
      }
    }
  }

  closeAjoutTransporteur(){
    this.closeModalAjoutTransporteur.emit();
  }

  request  = new Transporteur()

  transporteur  = new Transporteur()

  erreurTransporteur = {
    nom: "",
  }
  constructor(
    private notificationToast: ToastNotificationService,
    private informationGenerale: InformationsService,
    private transporteurServ : TransporteurService,
    private fnctModel:FnctModelService
    )
     { }

  ngOnInit(): void {
  }

  isLoading = false
  ajoutTransporteur() {
    if (!this.fnctModel.controleInput(this.erreurTransporteur, this.transporteur)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.transporteur) {
      this.request[key] = this.transporteur[key]
    }
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.transporteurServ.create(this.transporteur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.closeAjoutTransporteur()   
            this.notificationToast.showSuccess("Votre transporteur est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurTransporteur) {
      this.transporteur[key] = ""
    }
  }

}
