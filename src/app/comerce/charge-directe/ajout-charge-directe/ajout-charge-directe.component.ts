import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { ChargeDirecteService } from 'src/app/services/serviceBD_Comerce/charge-directe/charge-directe.service';

@Component({
  selector: 'app-ajout-charge-directe',
  templateUrl: './ajout-charge-directe.component.html',
  styleUrls: ['./ajout-charge-directe.component.scss']
})
export class AjoutChargeDirecteComponent implements OnInit {
  chargeDirecteFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  chargeDirecte = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurChargeDirecte = {
    libelle:"",
  }

  @Output() closeModalAjoutChargeDirecte = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutChargeDirecte = false
  
  titre = "charge"
  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutChargeDirecte) {
      this.getAllParametres()

      for (let key in this.erreurChargeDirecte) {
        this.erreurChargeDirecte[key] = ""

        if (document.getElementById(this.titre + key) != null) {
          document.getElementById(this.titre + key).classList.remove("border-erreur")
        }
      }

      for (let key in this.chargeDirecte) {
        this.chargeDirecte[key] = ""
      }
    }

  }

  closeAjoutChargeDirecte(){
    this.getAllParametres()
    this.closeModalAjoutChargeDirecte.emit();
  }
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private chargeDirecteSe: ChargeDirecteService,
    private router : Router) { }

  ngOnInit(): void {
    this.getAllParametres()
  }
  controleInputs() {
    for(let key in this.erreurChargeDirecte){
      this.erreurChargeDirecte[key] = ""
    }
    var isValid = true
    for(let key in this.erreurChargeDirecte){
      if(this.chargeDirecte[key] == ""){
        this.erreurChargeDirecte[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutChargeDirecte()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }  
    for(let key in this.chargeDirecte){
      this.request[key] = this.chargeDirecte[key]
    }   
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.chargeDirecteSe.create(this.chargeDirecte, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {       
            this.getAllParametres()
            this.closeModalAjoutChargeDirecte.emit()
            this.notificationToast.showSuccess("Votre charge Directe est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });  
  }
  //Get parametre of Frais ChargeDirecte
  allChargeDirectes = []
  getAllParametres() {
    this.chargeDirecteSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.allChargeDirectes = resultat.chargeDirectes
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  reseteFormulaire(){
    for(let key in this.erreurChargeDirecte){
      this.chargeDirecte[key] = ""
    }
  }
}
