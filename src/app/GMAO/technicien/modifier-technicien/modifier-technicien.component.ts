import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Technicien } from 'src/app/model/modelGMAO/technicien.model';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { InformationsService } from 'src/app/services/informations.service';
import { TechnicienService } from 'src/app/services/serviceBD_GMAO/technicien.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-technicien',
  templateUrl: './modifier-technicien.component.html',
  styleUrls: ['./modifier-technicien.component.scss']
})
export class ModifierTechnicienComponent implements OnInit {
  technicienFormGroup: FormGroup;
  id = "";
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
  
  erreurTechnicien : Technicien ={
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService,
    private technicienSe: TechnicienService,
    private fnctModel:FnctModelService) 
    {
      this.getAllParametres()
      this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      });
    }

  getTechnicien(id) {
    this.isLoading = true
    this.technicienSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.technicien) {
              this.technicien[key] = this.request[key]
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  ngOnInit(): void {
    this.getAllParametres()
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getTechnicien(this.id)
    }
  }

  isLoading = false
  modifierTechnicien() {
    if (!this.fnctModel.controleInput(this.erreurTechnicien, this.technicien)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
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
            this.notificationToast.showSuccess("Votre technicien est bien modifiée !")
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
  getAllParametres() {
    this.technicienSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
}
