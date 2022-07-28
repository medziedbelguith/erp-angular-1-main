import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from 'src/app/model/modelCommerce/marque';
import { InformationsService } from 'src/app/services/informations.service';
import { MarqueService } from 'src/app/services/serviceBD_Commerce/marque.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-marque',
  templateUrl: './modifier-marque.component.html',
  styleUrls: ['./modifier-marque.component.scss']
})
export class ModifierMarqueComponent implements OnInit {
  marqueFormGroup: FormGroup;
  
  objectKeys = Object.keys;

  @Output() closeModalModifierMarque = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierMarque = false

  closeModifierMarque(){
    this.closeModalModifierMarque.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierMarque == true){
      for (let key in this.erreurMarque) {
        this.erreurMarque[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.marque) {
        this.marque[key] = ""
      }

      if (this.id.length > 1) {
        this.getMarque(this.id)
      }
    }
  }

  request = new Marque()

  marque = new Marque()

  erreurMarque = {
    libelle:""
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private marqueSer: MarqueService,
    private notificationToast:ToastNotificationService,
    private router: Router,) {
  }

  getMarque(id) {
    
    this.isLoading = true
    this.marqueSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.marque) {
            this.marque[key] = this.request[key]
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
    for (let key in this.erreurMarque) {
      this.erreurMarque[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.marque) {
      if (this.marque[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurMarque[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.marque.libelle != ""){
      if(this.allMarques.filter(x => x.libelle == this.marque.libelle && x.id != this.id).length > 0){
        this.erreurMarque.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if(document.getElementById('libelle') != null){
          document.getElementById('libelle').classList.add("border-erreur")
        }
      
      }
    }
    return isValid
  }

  isLoading = false

  modifierMarque() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.marque) {
      this.request[key] = this.marque[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent   
    this.marqueSer.update(this.id, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre marque est bien modifiée !")
             this.closeModifierMarque()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 

  }
    //Get parametre of Marque
    tabLibelle = []
    allMarques = []
    getAllParametres() {
      this.marqueSer.parametre(this.informationGenerale.idSocieteCurrent)
        .subscribe(
          res => {
            let resultat: any = res
            if (resultat.status) {
              this.allMarques = resultat.marques
              for (let item of this.allMarques) {
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
    for (let key in this.erreurMarque) {
      this.marque[key] = ""
    }
  }

}
