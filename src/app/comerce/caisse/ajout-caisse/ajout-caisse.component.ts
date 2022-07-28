import { CaisseService } from './../../../services/serviceBD_Commerce/caisse.service';
import { Caisse } from './../../../model/modelCommerce/caisse';
import { Component, OnInit,  Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-caisse',
  templateUrl: './ajout-caisse.component.html',
  styleUrls: ['./ajout-caisse.component.scss']
})
export class AjoutCaisseComponent implements OnInit {
  caisseFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = new Caisse()

  caisse = new Caisse()

  erreurCaisse = {
    libelle:"",
  }

  titre = "Caisse"

  @Output() closeModalAjoutCaisse = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutCaisse = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutCaisse == true){
      for (let key in this.erreurCaisse) {
        this.erreurCaisse[key] = ""
        
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.remove("border-erreur")
        }
      }

      for (let key in this.caisse) {
        this.caisse[key] = ""
      }
    }
  }


  closeAjoutCaisse(){
    this.closeModalAjoutCaisse.emit();
  }
  
  constructor(
    private statuOpSer : CaisseService,
    private fnctModel: FnctModelService,
    private notificationToast:ToastNotificationService, 
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  ajoutCaisse()
  {   
    if (!this.fnctModel.controleInputs(this.erreurCaisse, this.caisse, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for(let key in this.caisse){
      this.request[key] = this.caisse[key]
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
          this.notificationToast.showSuccess("Votre caisse est bien enregistrée !")
          this.getAllParametres()
          this.closeAjoutCaisse()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 
  }
   //Get parametre of caisse
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
  reseteFormulaire(){
    for(let key in this.erreurCaisse){
      this.caisse[key] = ""
    }
  }

}
