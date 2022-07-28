import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Variante } from 'src/app/model/modelCommerce/variante';
import { VarianteService } from 'src/app/services/serviceBD_Commerce/variante.service';

@Component({
  selector: 'app-ajout-variante',
  templateUrl: './ajout-variante.component.html',
  styleUrls: ['./ajout-variante.component.scss']
})
export class AjoutVarianteComponent implements OnInit {

  varianteFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = new Variante()

  variante = new Variante()

  erreurVariante = {
    libelle: "",
    valeurs: "",
  }

  itemValeur = {
    valeur: ""
  }

  @Input() id = "";

  @Output() closeModalModifierVariante = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalModifierVariante = false

  closeAjoutVariante() {
    this.closeModalModifierVariante.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalModifierVariante) {

      this.variante = new Variante()

      this.erreurVariante = {
        libelle: "",
        valeurs: ""
      }

      if (document.getElementById("libelle") != null) {
        document.getElementById("libelle").classList.remove("border-erreur")
      }

      if (this.id.length > 1) {
        this.getVariante(this.id)
      }

    }
  }

  variantes = []
  controleInputs() {
    for (let key in this.erreurVariante) {
      this.erreurVariante[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
      for (let i in this.variante.valeurs) {
        if (this.variante.valeurs[i].valeur != '')
        {
          document.getElementById(this.variante.valeurs[i].id).classList.remove("border-erreur")
        }
      }
    }

    var isValid = true
    if (this.variante.libelle == "" || this.variante.libelle == null) {
      this.erreurVariante.libelle = "Veuillez remplir ce champ"
      isValid = false
      if (document.getElementById("libelle") != null) {
        document.getElementById("libelle").classList.add("border-erreur")
      }
    }

    if (this.variante.libelle != "") {
      if (this.allVariantes.filter(x => x.libelle == this.variante.libelle).length > 0) {
        this.erreurVariante.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }
      }
    }
    
    for (let i in this.variante.valeurs) {
      if (this.variante.valeurs[i].valeur == '') {
        this.erreurVariante.valeurs = "Veuillez remplir ce champ"
        if (document.getElementById(this.variante.valeurs[i].id) != null) {
          document.getElementById(this.variante.valeurs[i].id).classList.add("border-erreur")
        }     
        isValid = false
      }
    }

    return isValid
  }
  
  constructor(
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private fonctionPartagesService: FonctionPartagesService,
    private varianteSer: VarianteService,) {
    this.getAllParametres()
  }

  getVariante(id) {
    this.isLoading = true
    this.varianteSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.variante) {
              this.variante[key] = this.request[key]
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

  isLoading = false

  ajouterValeur() {
    var id = this.fonctionPartagesService.getIdOfArrayElement(this.variante.valeurs, 'id')
    this.variante.valeurs.push({ id: id, valeur: "" })

  }

  suprimmerValeur(id) {
    this.variante.valeurs = this.variante.valeurs.filter((x) => x._id != id)
  }

  sauvgarderDonnees() {
    if (this.id.length > 5) {
      this.modifierVariante()
    } else {

      this.ajoutVariante()
    }
  }

  modifierVariante() {
    for (let key in this.variante) {
      this.request[key] = this.variante[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.varianteSer.update(this.id, this.variante, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre variante est bien modifiée !")
            this.closeAjoutVariante()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  ajoutVariante() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.variante) {
      this.request[key] = this.variante[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.varianteSer.create(this.variante, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log("ajout", resultat)
            this.notificationToast.showSuccess("Votre Variante est bien enregistrée !")
            this.closeAjoutVariante()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  allVariantes = []
  tabLibelles = []
  getAllParametres() {
    this.varianteSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allVariantes = resultat.variantes
            for (let item of this.allVariantes) {
              this.tabLibelles.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  reseteFormulaire() {
    for (let key in this.erreurVariante) {
      this.variante[key] = ""
    }
  }

}
