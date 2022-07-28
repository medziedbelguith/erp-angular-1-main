import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatuOpportunite } from 'src/app/model/modelCommerce/statuOpportunite';
import { InformationsService } from 'src/app/services/informations.service';
import { StatuOpportuniteService } from 'src/app/services/serviceBD_Commerce/statuOpportunite.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-statu-opportunite',
  templateUrl: './modifier-statu-opportunite.component.html',
  styleUrls: ['./modifier-statu-opportunite.component.scss']
})
export class ModifierStatuOpportuniteComponent implements OnInit {

  StatuOpportuniteFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierStatuOpportunite = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierStatuOpportunite = false

  closeModifierStatuOpportunite(){
    this.closeModalModifierStatuOpportunite.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierStatuOpportunite == true){
      for (let key in this.erreurStatuOpportunite) {
        this.erreurStatuOpportunite[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.statuOpportunite) {
        this.statuOpportunite[key] = ""
      }

      if (this.id.length > 1) {
        this.getStatuOpportunite(this.id)
      }
    }
  }

  request = new StatuOpportunite()

  statuOpportunite = new StatuOpportunite()

  erreurStatuOpportunite = {
    libelle:""
  }
  constructor(
    private statuOpSer : StatuOpportuniteService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router,) {

   
  }

  getStatuOpportunite(id) {   
    this.isLoading = true
    this.statuOpSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.statuOpportunite) {
            this.statuOpportunite[key] = this.request[key]
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
    for (let key in this.erreurStatuOpportunite) {
      this.erreurStatuOpportunite[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurStatuOpportunite) {
      if (this.statuOpportunite[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurStatuOpportunite[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    if (this.statuOpportunite.libelle != "") {
      if (this.allStatuOpportunites.filter(x => x.libelle == this.statuOpportunite.libelle && x.id != this.id).length > 0) {
        this.erreurStatuOpportunite.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }

      }
    }
    return isValid
  }

  isLoading = false

  modifierStatuOpportunite() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.statuOpportunite) {
      this.request[key] = this.statuOpportunite[key]
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
          console.log(resultat)
             this.notificationToast.showSuccess("Votre StatuOpportunite est bien modifiée !")
             this.closeModifierStatuOpportunite()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }
   //Get parametre of StatuOpportunite
   tabLibelle = []
   allStatuOpportunites = []
   getAllParametres() {
     this.statuOpSer.parametre(this.informationGenerale.idSocieteCurrent)
       .subscribe(
         res => {
           let resultat: any = res
           if (resultat.status) {
             this.allStatuOpportunites = resultat.statuOpportunites
             for (let item of this.allStatuOpportunites) {
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
    for (let key in this.erreurStatuOpportunite) {
      this.statuOpportunite[key] = ""
    }
  }

}
