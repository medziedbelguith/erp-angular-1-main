import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-unite-mesure',
  templateUrl: './ajout-unite-mesure.component.html',
  styleUrls: ['./ajout-unite-mesure.component.scss']
})
export class AjoutUniteMesureComponent implements OnInit {
  uniteMesureFormGroup: FormGroup;
  lienAjoute = "/uniteMesures/newUniteMesure"
  objectKeys = Object.keys;

  request = {
    libelle:"",
    code:"",
    societeRacine:""
  }

  uniteMesure = {
    libelle:"",
    code:"",
    societeRacine:""
  }

  erreurUniteMesure = {
    libelle:"",
    code:"",
  }

  @Output() closeModalAjoutUniteMesure = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutUniteMesure = false
  
  closeAjoutUniteMesure(){
    this.closeModalAjoutUniteMesure.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutUniteMesure == true){
      for (let key in this.erreurUniteMesure) {
        this.erreurUniteMesure[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.uniteMesure) {
        this.uniteMesure[key] = ""
      }

    }
  }
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private router : Router) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurUniteMesure){
      this.erreurUniteMesure[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for(let key in this.erreurUniteMesure){
      if(this.uniteMesure[key] == ""){
        this.erreurUniteMesure[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutUniteMesure()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }  
    for(let key in this.uniteMesure){
      this.request[key] = this.uniteMesure[key]
    }   
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
           if(this.isPopup){
             this.closeAjoutUniteMesure()
           }else{
            this.router.navigate(['variable/uniteMesure/ajout']);
           }
           this.notificationToast.showSuccess("Votre uniteMesure est bien enregistrée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurUniteMesure){
      this.uniteMesure[key] = ""
    }
  }
}
