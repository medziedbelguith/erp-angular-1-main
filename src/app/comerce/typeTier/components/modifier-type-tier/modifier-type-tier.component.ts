import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { TypeTierService } from 'src/app/services/serviceBD_Commerce/typeTier.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Typetier } from '../../models/typetier';

@Component({
  selector: 'app-modifier-type-tier',
  templateUrl: './modifier-type-tier.component.html',
  styleUrls: ['./modifier-type-tier.component.scss']
})
export class ModifierTypeTierComponent implements OnInit {
  typeTierFormGroup: FormGroup;

  objectKeys = Object.keys;
  @Output() closeModalModifierTypeTier = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierTypeTier = false

  closeModifierTypeTier() {
    this.closeModalModifierTypeTier.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalModifierTypeTier == true) {
      for (let key in this.erreurTypeTier) {
        this.erreurTypeTier[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeTier) {
        this.typeTier[key] = ""
      }

      if (this.id.length > 1) {
        this.getTypeTier(this.id)
      }
    }
  }


  request= new Typetier()

  typeTier = new Typetier()

  erreurTypeTier = {
    libelle: ""
  }
  constructor(
    private typeTierSer: TypeTierService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService) {


  }

  getTypeTier(id) {
    this.isLoading = true
    this.typeTierSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.typeTier) {
              this.typeTier[key] = this.request[key]
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
  }
  //Get parametre of TypeTier
  tabLibelle = []
  allTypeTiers = []
  getAllParametres() {
    this.typeTierSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allTypeTiers = resultat.typeTiers
            for (let item of this.allTypeTiers) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurTypeTier) {
      this.erreurTypeTier[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.typeTier) {
      if (this.typeTier[key] == "") {
        this.erreurTypeTier[key] = "Veuillez remplir ce champ"
        isValid = false
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }

    if(this.typeTier.libelle != ""){
      if(this.allTypeTiers.filter(x => x.libelle == this.typeTier.libelle && x.id != this.id).length > 0){
        this.erreurTypeTier.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if(document.getElementById('libelle') != null){
          document.getElementById('libelle').classList.add("border-erreur")
        }
      
      }
    }
    return isValid
  }

  isLoading = false

  modifierTypeTier() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.typeTier) {
      this.request[key] = this.typeTier[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.typeTierSer.update(this.id, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeModifierTypeTier()
          this.notificationToast.showSuccess("Votre Type Tier est bien modifiée !")
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  reseteFormulaire() {
    for (let key in this.erreurTypeTier) {
      this.typeTier[key] = ""
    }
  }

}
