import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ajout-secteur',
  templateUrl: './ajout-secteur.component.html',
  styleUrls: ['./ajout-secteur.component.scss']
})
export class AjoutSecteurComponent implements OnInit {
  secteurFormGroup: FormGroup;
  lienAjoute = "/secteurs/newSecteur"
  objectKeys = Object.keys;

  request = {
    typeS:"",
    societe:""
  }

  secteur = {
    typeS:"",
    societe:""
  }

  erreurSecteur = {
    typeS:"",
  }

  @Output() closeModalAjoutSecteur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutSecteur = false

  closeAjoutSecteur(){
    this.closeModalAjoutSecteur.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutSecteur == true){
     
      for (let key in this.erreurSecteur) {
        this.erreurSecteur[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.secteur) {
        this.secteur[key] = ""
      }

    }
  }


  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private router: Router,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurSecteur){
      this.erreurSecteur[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    for(let key in this.erreurSecteur){
      if(this.secteur[key] == ""){
        this.erreurSecteur[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutSecteur()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }  
    for(let key in this.secteur){
      this.request[key] = this.secteur[key]
    }   
    this.request.societe= this.informationGenerale.idSocieteCurrent   
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
            this.notificationToast.showSuccess("Votre Sous Famille est bien enregistrée !")
            this.closeAjoutSecteur()
         
          }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurSecteur){
      this.secteur[key] = ""
    }
  }
}
