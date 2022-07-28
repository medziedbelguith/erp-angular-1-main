import { TypeTierService } from './../../../../services/serviceBD_Commerce/typeTier.service';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Typetier } from '../../models/typetier';
import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-type-tier',
  templateUrl: './ajout-type-tier.component.html',
  styleUrls: ['./ajout-type-tier.component.scss']
})
export class AjoutTypeTierComponent implements OnInit {
  typeTierFormGroup: FormGroup;
  objectKeys = Object.keys;

  request:Typetier

  typeTier:Typetier

  erreurTypeTier = {
    libelle:"",
  }

  @Output() closeModalAjoutTypeTier = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() idFamille = ""

  closeAjoutTypeTier(){
    this.closeModalAjoutTypeTier.emit();
  }

  @Input() isOpenModalAjoutTypeTier = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutTypeTier == true){
      
      for (let key in this.erreurTypeTier) {
        this.erreurTypeTier[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeTier) {
        this.typeTier[key] = ""
      }

    }
  }

  constructor(
    private typeTierSer : TypeTierService,
    private notificationToast:ToastNotificationService, 
    private fnctModel: FnctModelService,
    public informationGenerale: InformationsService) { 
      this.request = new Typetier()
      this.typeTier = new Typetier()
  }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  ajoutTypeTier()
  {   
    if (!this.fnctModel.controleInputs(this.erreurTypeTier, this.typeTier, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   
    for(let key in this.typeTier){
      this.request[key] = this.typeTier[key]
    }   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.typeTierSer.create(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutTypeTier();
            this.notificationToast.showSuccess("Votre type tier est bien enregistrée !")
          }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
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
  reseteFormulaire(){
    for(let key in this.erreurTypeTier){
      this.typeTier[key] = ""
    }
  }

}
