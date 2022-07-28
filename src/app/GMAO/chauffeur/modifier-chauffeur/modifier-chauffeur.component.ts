import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from 'src/app/model/modelGMAO/chauffeur.model';
import { InformationsService } from 'src/app/services/informations.service';
import { ChauffeurService } from 'src/app/services/serviceBD_GMAO/chauffeur.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-chauffeur',
  templateUrl: './modifier-chauffeur.component.html',
  styleUrls: ['./modifier-chauffeur.component.scss']
})
export class ModifierChauffeurComponent implements OnInit {
  chauffeurFormGroup: FormGroup;
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

  chauffeur: Chauffeur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurChauffeur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  constructor(
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService,
    private chauffeurServ: ChauffeurService) {
  }

  ngOnInit(): void {
    this.getAllParametres()
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getChauffeur(this.id)
    }
  }

  getChauffeur(id) {
    this.isLoading = true
    this.chauffeurServ.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.chauffeur) {
              this.chauffeur[key] = this.request[key]
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  controleInputs() {
    for (let key in this.erreurChauffeur) {
      this.erreurChauffeur[key] = ""
    }
    var isValid = true
    for (let key in this.chauffeur) {
      if (this.chauffeur[key] == "") {
        this.erreurChauffeur[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }

  isLoading = false
  modifierChauffeur() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.chauffeur) {
      this.request[key] = this.chauffeur[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.chauffeurServ.update(this.id, this.chauffeur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.router.navigate(['/chauffeur/list']);
            this.notificationToast.showSuccess("Votre chauffeur est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurChauffeur) {
      this.chauffeur[key] = ""
    }
  }

  allRoles = []
  getAllParametres() {
    this.chauffeurServ.parametre(this.informationGenerale.idSocieteCurrent)
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
