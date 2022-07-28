import { Personnel } from 'src/app/model/modelCommerce/personnel';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { PersonnelService } from 'src/app/services/serviceBD_Commerce/personnel.service';

@Component({
  selector: 'app-modifier-personnel',
  templateUrl: './modifier-personnel.component.html',
  styleUrls: ['./modifier-personnel.component.scss']
})
export class ModifierPersonnelComponent implements OnInit {
  personnelFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierPersonnel = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierPersonnel = false

  closeModifierPersonnel(){
    this.closeModalModifierPersonnel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierPersonnel == true){
      for (let key in this.erreurPersonnel) {
        this.erreurPersonnel[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.personnel) {
        this.personnel[key] = ""
      }

      if (this.id.length > 1) {
        this.getAllParametres()
        this.getPersonnel(this.id)
      }
    }
  }
  
  request = new Personnel()

  personnel = new Personnel()
  
  erreurPersonnel = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private personnelSe: PersonnelService,) {
  }

  isLoading = false
  getPersonnel(id) {
    this.isLoading = true
    this.personnelSe.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.personnel) {
              this.personnel[key] = this.request[key]
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  ngOnInit(): void {
   
  }

  controleInputs() {
    for (let key in this.erreurPersonnel) {
      this.erreurPersonnel[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in this.personnel) {
      if (this.personnel[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurPersonnel[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
  
    if(this.personnel.email != ""){
      if(this.allPersonnels.filter(x => x.email == this.personnel.email).length > 0){
        this.erreurPersonnel.email = "Cette email est déjà utilisée !!"
        isValid = false
        if(document.getElementById('email') != null){
          document.getElementById('email').classList.add("border-erreur")
        }
      }
    }
    return isValid
  }

  modifierPersonnel() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.personnel) {
      this.request[key] = this.personnel[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.personnelSe.update(this.id,this.personnel, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre personnel est bien modifiée !")
          this.closeModifierPersonnel()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  reseteFormulaire() {
    for (let key in this.erreurPersonnel) {
      this.personnel[key] = ""
    }
  }

  allRoles = []
  allPersonnels = []
  getAllParametres() {
    this.personnelSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
            this.allPersonnels = resultat.personnels
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
}
