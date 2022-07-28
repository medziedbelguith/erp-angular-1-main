import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { TypeFraisService } from 'src/app/services/serviceBD_GMAO/type-frais.service';

@Component({
  selector: 'app-ajout-type-frais',
  templateUrl: './ajout-type-frais.component.html',
  styleUrls: ['./ajout-type-frais.component.scss']
})
export class AjoutTypeFraisComponent implements OnInit {
  typeFraisFormGroup: FormGroup;
  lienAjoute = "/typeFraiss/newTypeFrais"
  objectKeys = Object.keys;
  
  @Output() closeModalAjoutTypeFrais = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutTypeFrais = false

  request = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  typeFrais = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurTypeFrais = {
    libelle:"",
  }
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private typeFraisSe: TypeFraisService,
    private router : Router) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurTypeFrais){
      this.erreurTypeFrais[key] = ""
    }
    var isValid = true
    for(let key in this.erreurTypeFrais){
      if(this.typeFrais[key] == ""){
        this.erreurTypeFrais[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutTypeFrais()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }  
    for(let key in this.typeFrais){
      this.request[key] = this.typeFrais[key]
    }   
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.typeFraisSe.create(this.typeFrais, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.closeModalAjoutTypeFrais.emit()
            this.notificationToast.showSuccess("Votre CategorieMachine est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });  
  }
  //Get parametre of Type Mission
  allTypeFrais = []
  getAllParametres() {
    this.typeFraisSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allTypeFrais = resultat.typefraiss
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  
  reseteFormulaire(){
    for(let key in this.erreurTypeFrais){
      this.typeFrais[key] = ""
    }
  }


}
