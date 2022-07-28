import { Component, OnInit,  Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-taux-tva',
  templateUrl: './ajout-taux-tva.component.html',
  styleUrls: ['./ajout-taux-tva.component.scss']
})
export class AjoutTauxTvaComponent implements OnInit {
  tauxTVAFormGroup: FormGroup;
  lienAjoute = "/tauxTVAs/newTauxTVA"
  objectKeys = Object.keys;

  @Output() closeModalAjoutTauxTva = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutTauxTva = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutTauxTva == true){
      for (let key in this.erreurTauxTVA) {
        this.erreurTauxTVA[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      this.tauxTVA = {
        taux:0,
        libelle:"",
        societe:""
      }
    }
  }


  closeAjoutTauxTva(){ 
    this.closeModalAjoutTauxTva.emit();
  }

  request = {
    taux:0,
    libelle:"",
    societe:""
  }

  tauxTVA = {
    taux:0,
    libelle:"",
    societe:""
  }

  erreurTauxTVA = {
    taux:"",
  }
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private router: Router,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurTauxTVA){
      this.erreurTauxTVA[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }   
    var isValid = true
   
    if(this.tauxTVA.taux < 0){
      var key = 'taux'
      this.erreurTauxTVA[key] = "Veuillez remplir ce champ"
      isValid = false
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.add("border-erreur")
      }
    }
  
    return isValid
  }

  isLoading = false

  ajoutTauxTVA()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   
    for(let key in this.tauxTVA){
      this.request[key] = this.tauxTVA[key]
    }     

    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutTauxTva()
          this.notificationToast.showSuccess("Le taux de TVA est bien enregistrée !")
        }else{
          this.notificationToast.showError("Le taux de TVA existe déjà !!")
          var key = 'taux'
          this.erreurTauxTVA[key] = "Le taux de TVA existe déjà !!"
          if(document.getElementById(key) != null){
            document.getElementById(key).classList.add("border-erreur")
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurTauxTVA){
      this.tauxTVA[key] = ""
    }
  }
}
