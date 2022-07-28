import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeLivraison } from 'src/app/model/modelCommerce/modeLivraison';
import { InformationsService } from 'src/app/services/informations.service';
import { ModeLivraisonService } from 'src/app/services/serviceBD_Commerce/modeLivraison.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-mode-livraison',
  templateUrl: './modifier-mode-livraison.component.html',
  styleUrls: ['./modifier-mode-livraison.component.scss']
})
export class ModifierModeLivraisonComponent implements OnInit {
  modeLivraisonFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierModeLivraison = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierModeLivraison = false

  closeModifierModeLivraison() {
    this.closeModalModifierModeLivraison.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalModifierModeLivraison == true) {
      for (let key in this.erreurModeLivraison) {
        this.erreurModeLivraison[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modeLivraison) {
        this.modeLivraison[key] = ""
      }

      if (this.id.length > 1) {
        this.getModeLivraison(this.id)
      }
    }
  }

  request = new ModeLivraison()

  modeLivraison = new ModeLivraison()

  erreurModeLivraison = {
    libelle: "",
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private notificationToast: ToastNotificationService,
    private modeLivSer: ModeLivraisonService,
    private router: Router) {
    this.getAllParametres()

  }

  getModeLivraison(id) {
    this.isLoading = true
    this.modeLivSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.modeLivraison) {
              this.modeLivraison[key] = this.request[key]
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
    for (let key in this.erreurModeLivraison) {
      this.erreurModeLivraison[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true
    for (let key in this.erreurModeLivraison) {
      if (this.modeLivraison[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurModeLivraison[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.modeLivraison.libelle != ""){
      if(this.allModeLivraisons.filter(x => x.libelle == this.modeLivraison.libelle && x.id != this.id).length > 0){
        this.erreurModeLivraison.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if(document.getElementById('libelle') != null){
          document.getElementById('libelle').classList.add("border-erreur")
        }
      
      }
    }
    return isValid
  }

  isLoading = false

  modifierModeLivraison() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.modeLivraison) {
      this.request[key] = this.modeLivraison[key]
    }

    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.modeLivSer.update(this.id, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.closeModifierModeLivraison()
            this.notificationToast.showSuccess("Votre mode Livraison est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

    //Get parametre of ModeLivraison
    tabLibelle = []
    allModeLivraisons = []
    getAllParametres() {
      this.modeLivSer.parametre(this.informationGenerale.idSocieteCurrent)
        .subscribe(
          res => {
            let resultat: any = res
            if (resultat.status) {
              this.allModeLivraisons = resultat.modeLivraisons
              for (let item of this.allModeLivraisons) {
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
