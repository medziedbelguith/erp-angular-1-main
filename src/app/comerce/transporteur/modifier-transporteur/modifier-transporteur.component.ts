import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transporteur } from 'src/app/model/modelCommerce/transporteur';
import { InformationsService } from 'src/app/services/informations.service';
import { TransporteurService } from 'src/app/services/serviceBD_Commerce/transporteur.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-transporteur',
  templateUrl: './modifier-transporteur.component.html',
  styleUrls: ['./modifier-transporteur.component.scss']
})
export class ModifierTransporteurComponent implements OnInit {
  transporteurFormGroup: FormGroup;
  objectKeys = Object.keys;

  @Output() closeModalModifierTransporteur = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalAjoutTransporteur = false

  closeModifierTransporteur(){
    this.closeModalModifierTransporteur.emit();
  }

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

      if (this.id.length > 1) {
        this.getTransporteur(this.id)
      }
    }
  }

  request = new Transporteur()
  transporteur = new Transporteur()  
  erreurTransporteur = {
    nom: "",
  }

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast: ToastNotificationService,
    private transporteurServ : TransporteurService,) {
  }

  getTransporteur(id) {
    this.isLoading = true
    this.transporteurServ.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
          for (let key in this.transporteur) {
            this.transporteur[key] = this.request[key]
          }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  ngOnInit(): void {
    if (this.id.length > 1) {
      this.getTransporteur(this.id)
    }
  }

  controleInputs() {
    for (let key in this.erreurTransporteur) {
      this.erreurTransporteur[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in this.erreurTransporteur) {
      if (this.transporteur[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurTransporteur[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    return isValid
  }

  isLoading = false
  modifierTransporteur() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.transporteurServ.update(this.id, this.transporteur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.closeModifierTransporteur()
            this.notificationToast.showSuccess("Votre transporteur est bien modifiée !")
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
