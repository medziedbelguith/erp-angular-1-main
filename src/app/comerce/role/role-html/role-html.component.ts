import { RoleService } from './../../../services/serviceBD_Commerce/role.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/modelCommerce/role';
const modules = require("../modules.json");

@Component({
  selector: 'app-role-html',
  templateUrl: './role-html.component.html',
  styleUrls: ['./role-html.component.scss']
})
export class RoleHtmlComponent implements OnInit {

  roleFormGroup: FormGroup;
  lienAjoute = "/roles/newRole"
  lienModifie = "/roles/modifierRole/"
  lienGetById = "/roles/getById/"
  @Input() isDetails = 'non'
  @Input() titreCrud = "Ajouter"

  id = "";
  objectKeys = Object.keys;
  modules = []

  request = new Role()

  role = new Role()

  droites = []

  erreurRole = {
    libelle: "",
  }

  isPopup = false

  constructor(
    private roleSer: RoleService,
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public informationGenerale: InformationsService) {

    this.modules = modules

  }

  idSociete = ""

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.idSociete = this.route.snapshot.paramMap.get('idSociete');

    if (this.idSociete) {
      this.informationGenerale.idSocieteCurrent = this.idSociete
    }

    if (this.id) {
      this.getRole(this.id)
    }

    this.getAllParametres()
  }

  getRole(id) {

    this.isLoading = true
    this.roleSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            this.droites = this.request.modules

            for (let key in this.role) {
              this.role[key] = this.request[key]
            }

          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurRole) {
      this.erreurRole[key] = ""

      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurRole) {
      if (this.role[key] == "") {
        this.erreurRole[key] = "Veuillez remplir ce champ"
        isValid = false

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }

    if (this.role.libelle != "") {
      if (this.allRoles.filter(x => x.libelle == this.role.libelle && x.id != this.id).length > 0) {
        this.erreurRole.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }

      }
    }
    return isValid
  }

  isLoading = false

  clickEnregistrer() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.modifierRole()
    } else {
      this.ajoutRole()
    }
  }

  ajoutRole() {
    if (this.isLoading) {
      return
    }

    if (!this.controleInputs()) {
      this.notificationToast.showErrorSmall("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.role) {
      this.request[key] = this.role[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent

    this.request.modules = this.droites
    this.isLoading = true
    this.roleSer.create(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccessSmall("Votre role est bien enregistrée !")
          if (!this.idSociete) {
            this.router.navigate(['role/list']);
          } else {
            this.router.navigate(['/dashboard-admin/role/' + this.informationGenerale.idSocieteCurrent]);
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  modifierRole() {

    if (this.isLoading) {
      return
    }

    if (!this.controleInputs()) {
      this.notificationToast.showErrorSmall("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.role) {
      this.request[key] = this.role[key]
    }

    this.isLoading = true

    this.request.modules = this.droites
    this.roleSer.update(this.id,this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccessSmall("Votre role est bien modifiée !")
          if (!this.idSociete) {
            this.router.navigate(['role/list']);
          } else {
            this.router.navigate(['/dashboard-admin/role/' + this.informationGenerale.idSocieteCurrent]);
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  reseteFormulaire() {
    for (let key in this.erreurRole) {
      this.role[key] = ""
    }
  }

  clickAccee(id, titre) {
    var ok = false
    for (let i = 0; i < this.droites.length; i++) {
      if (this.droites[i].id == id) {
        ok = true
        if (this.droites[i].avoirAccee == "oui") {
          this.droites[i].avoirAccee = "non"
        } else {
          this.droites[i].avoirAccee = "oui"
        }
      }
    }

    if (ok == false) {
      this.droites.push({ id: id, avoirAccee: "oui", titre: titre })
    }
  }

  cocheTout(titre) {
    for (let i = 0; i < this.droites.length; i++) {
      this.droites[i].avoirAccee = titre
    }
  }

  verifierAccee(id, titre) {
    var ok = false
    for (let i = 0; i < this.droites.length; i++) {
      if (this.droites[i].id == id) {
        ok = true
        if (this.droites[i].avoirAccee == "oui") {
          return true
        }
      }
    }

    if (ok == false) {
      this.droites.push({ id: id, avoirAccee: "non", titre: titre })
    }

    return false
  }

  //Get parametre of allRoles
  tabLibelle = []
  allRoles = []
  getAllParametres() {
    this.roleSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
            for (let item of this.allRoles) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

}