import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeCompte } from 'src/app/model/modelCommerce/typeCompte';
import { InformationsService } from 'src/app/services/informations.service';
import { TypeCompteService } from 'src/app/services/serviceBD_Commerce/typeCompte.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-type-compte',
  templateUrl: './modifier-type-compte.component.html',
  styleUrls: ['./modifier-type-compte.component.scss']
})
export class ModifierTypeCompteComponent implements OnInit {

  TypeCompteFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierTypeCompte = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierTypeCompte = false

  closeModifierTypeCompte(){
    this.closeModalModifierTypeCompte.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierTypeCompte == true){
      for (let key in this.erreurTypeCompte) {
        this.erreurTypeCompte[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeCompte) {
        this.typeCompte[key] = ""
      }

      if (this.id.length > 1) {
        this.getTypeCompte(this.id)
      }
    }
  }

  request  = new TypeCompte()

  typeCompte  = new TypeCompte()

  erreurTypeCompte = {
    libelle:""
  }
  constructor(
    private typeCompteSer: TypeCompteService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router,) {

   
  }

  getTypeCompte(id) {   
    this.isLoading = true
    this.typeCompteSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.typeCompte) {
            this.typeCompte[key] = this.request[key]
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

  controleInputs() {
    for (let key in this.erreurTypeCompte) {
      this.erreurTypeCompte[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurTypeCompte) {
      if (this.typeCompte[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurTypeCompte[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.typeCompte.libelle != ""){
      if(this.allTypeComptes.filter(x => x.libelle == this.typeCompte.libelle && x.id != this.id).length > 0){
        this.erreurTypeCompte.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if(document.getElementById('libelle') != null){
          document.getElementById('libelle').classList.add("border-erreur")
        }
      
      }
    }
    return isValid
  }

  isLoading = false

  modifierTypeCompte() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.typeCompte) {
      this.request[key] = this.typeCompte[key]
    }

    if (this.isLoading) {
      return
    }
    
    this.isLoading = true
    this.typeCompteSer.update(this.id,this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre TypeCompte est bien modifiée !")
             this.closeModifierTypeCompte()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }
  //Get parametre of TypeCompte
  tabLibelle = []
  allTypeComptes = []
  getAllParametres() {
    this.typeCompteSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allTypeComptes = resultat.typeComptes
            for (let item of this.allTypeComptes) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  
  reseteFormulaire() {
    for (let key in this.erreurTypeCompte) {
      this.typeCompte[key] = ""
    }
  }

}
