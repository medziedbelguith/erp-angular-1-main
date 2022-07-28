import { StatuOpportuniteService } from './../../../services/serviceBD_Commerce/statuOpportunite.service';
import { StatuOpportunite } from './../../../model/modelCommerce/statuOpportunite';
import { Component, OnInit,  Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-statu-opportunite',
  templateUrl: './ajout-statu-opportunite.component.html',
  styleUrls: ['./ajout-statu-opportunite.component.scss']
})
export class AjoutStatuOpportuniteComponent implements OnInit {
  StatuOpportuniteFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = new StatuOpportunite()

  statuOpportunite = new StatuOpportunite()

  erreurStatuOpportunite = {
    libelle:"",
  }

  titre = "StatuOpportunite"

  @Output() closeModalAjoutStatuOpportunite = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutStatuOpportunite = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutStatuOpportunite == true){
      for (let key in this.erreurStatuOpportunite) {
        this.erreurStatuOpportunite[key] = ""
        
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.remove("border-erreur")
        }
      }

      for (let key in this.statuOpportunite) {
        this.statuOpportunite[key] = ""
      }
    }
  }


  closeAjoutStatuOpportunite(){
    this.closeModalAjoutStatuOpportunite.emit();
  }
  
  constructor(
    private statuOpSer : StatuOpportuniteService,
    private fnctModel: FnctModelService,
    private notificationToast:ToastNotificationService, 
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  ajoutStatuOpportunite()
  {   
    if (!this.fnctModel.controleInputs(this.erreurStatuOpportunite, this.statuOpportunite, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for(let key in this.statuOpportunite){
      this.request[key] = this.statuOpportunite[key]
    }   
    if (this.isLoading) {
      return
    }

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.isLoading = true   
    this.statuOpSer.create(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutStatuOpportunite()
          this.notificationToast.showSuccess("Votre StatuOpportunite est bien enregistrée !")
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
  reseteFormulaire(){
    for(let key in this.erreurStatuOpportunite){
      this.statuOpportunite[key] = ""
    }
  }

}

