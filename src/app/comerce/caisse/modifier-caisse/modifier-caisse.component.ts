import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Caisse } from 'src/app/model/modelCommerce/caisse';
import { InformationsService } from 'src/app/services/informations.service';
import { CaisseService } from 'src/app/services/serviceBD_Commerce/caisse.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-caisse',
  templateUrl: './modifier-caisse.component.html',
  styleUrls: ['./modifier-caisse.component.scss']
})
export class ModifierCaisseComponent implements OnInit {

  caisseFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierCaisse = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierCaisse = false

  closeModifierCaisse(){
    this.closeModalModifierCaisse.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierCaisse == true){
      for (let key in this.erreurCaisse) {
        this.erreurCaisse[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.caisse) {
        this.caisse[key] = ""
      }

      if (this.id.length > 1) {
        this.getCaisse(this.id)
      }
    }
  }

  request = new Caisse()

  caisse = new Caisse()

  erreurCaisse = {
    libelle:""
  }
  constructor(
    private statuOpSer : CaisseService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router,) {

   this.getAllParametres()
  }

  getCaisse(id) {   
    this.isLoading = true
    this.statuOpSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.caisse) {
            this.caisse[key] = this.request[key]
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
    for (let key in this.erreurCaisse) {
      this.erreurCaisse[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurCaisse) {
      if (this.caisse[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurCaisse[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    if (this.caisse.libelle != "") {
      if (this.allCaisses.filter(x => x.libelle == this.caisse.libelle && x.id != this.id).length > 0) {
        this.erreurCaisse.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }

      }
    }
    return isValid
  }

  isLoading = false

  modifierCaisse() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.caisse) {
      this.request[key] = this.caisse[key]
    }

    if (this.isLoading) {
      return
    }
    
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.statuOpSer.update(this.id,this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre Caisse est bien modifiée !")
             this.closeModifierCaisse()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }
   //Get parametre of Caisse
   tabLibelle = []
   allCaisses = []
   getAllParametres() {
     this.statuOpSer.parametre(this.informationGenerale.idSocieteCurrent)
       .subscribe(
         res => {
           let resultat: any = res
           if (resultat.status) {
             this.allCaisses = resultat.caisses
             for (let item of this.allCaisses) {
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
    for (let key in this.erreurCaisse) {
      this.caisse[key] = ""
    }
  }

}
