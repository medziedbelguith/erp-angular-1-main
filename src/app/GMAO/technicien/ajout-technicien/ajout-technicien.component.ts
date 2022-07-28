import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Technicien } from 'src/app/model/modelGMAO/technicien.model';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TechnicienService } from 'src/app/services/serviceBD_GMAO/technicien.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-technicien',
  templateUrl: './ajout-technicien.component.html',
  styleUrls: ['./ajout-technicien.component.scss']
})
export class AjoutTechnicienComponent implements OnInit {
  technicienFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  technicien : Technicien = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  erreurTechnicien : Technicien = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }
  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private technicienSe: TechnicienService,
    private fnctModel:FnctModelService) 
    {
      this.getAllParametres()
    }

  ngOnInit(): void {
  }
  isLoading = false
  ajoutTechnicien() {
    if (!this.fnctModel.controleInputs(this.erreurTechnicien, this.technicien,this.tabEmails, 'email')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.technicien) {
      this.request[key] = this.technicien[key]
    } 
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.technicienSe.create(this.technicien, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.router.navigate(['gmao/technicien/list']);
            this.notificationToast.showSuccess("Votre type tier est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurTechnicien) {
      this.technicien[key] = ""
    }
  }

  allRoles = []
  allEmails = []
  tabEmails = []
  getAllParametres() {
    this.technicienSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat",resultat)
            this.allRoles = resultat.roles
            this.allEmails = resultat.techniciens
            for (let item of this.allEmails) {
              this.tabEmails.push(item.email)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
}
