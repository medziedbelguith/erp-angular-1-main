import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-modifier-secteur',
  templateUrl: './modifier-secteur.component.html',
  styleUrls: ['./modifier-secteur.component.scss']
})
export class ModifierSecteurComponent implements OnInit {
  secteurFormGroup: FormGroup;

  lienModifie = "/secteurs/modifierSecteur/"
  lienGetById = "/secteurs/getById/"

  objectKeys = Object.keys;
  @Output() closeModalModifierSecteur = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierSecteur = false

  closeModifierSecteur(){
    this.closeModalModifierSecteur.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierSecteur == true){
      for (let key in this.erreurSecteur) {
        this.erreurSecteur[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.secteur) {
        this.secteur[key] = ""
      }

      if (this.id.length > 1) {
        this.getSecteur(this.id)
      }
    }
  }

  request = {
    typeS:"",
  }

  secteur = {
    typeS:"",
  }

  erreurSecteur = {
    typeS:""
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router,) {

   
  }

  getSecteur(id) {   
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.secteur) {
            this.secteur[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    
  }

  controleInputs() {
    for (let key in this.erreurSecteur) {
      this.erreurSecteur[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true
    for (let key in this.erreurSecteur) {
      if (this.secteur[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurSecteur[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }

  isLoading = false

  modifierSecteur() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
    for (let key in this.secteur) {
      this.request[key] = this.secteur[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeModifierSecteur()
          this.notificationToast.showSuccess("Votre secteur est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurSecteur) {
      this.secteur[key] = ""
    }
  }
}
