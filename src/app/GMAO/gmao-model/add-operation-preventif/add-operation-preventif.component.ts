import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OperationPreventif } from 'src/app/model/modelGMAO/operationPreventif.model';
import { OperationPreventifService } from 'src/app/services/serviceBD_GMAO/operation-preventif.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-add-operation-preventif',
  templateUrl: './add-operation-preventif.component.html',
  styleUrls: ['./add-operation-preventif.component.scss']
})
export class AddOperationPreventifComponent implements OnInit {

  @Input() isOpenModalAjoutOperationPreventif = false

  @Input() isLoading = false

  @Input() idAjoutOperationPreventifModal
  
  @Input() params1AjoutOperationPreventif

  @Input() params2AjoutOperationPreventif

  @Input() idCategorie = ""
  
  classCss = "modalAjoutOperationPreventif"

  @Output() closeModalAjoutOperationPreventif = new EventEmitter<string>();

  constructor( 
    private router:Router,  
    private http: HttpClient,
    private fnctModel: FnctModelService,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private opeSe: OperationPreventifService){ 
   
  }


  closeAjoutOperationPreventif(){
    this.closeModalAjoutOperationPreventif.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutOperationPreventif){
      this.classCss = "modalAjoutOperationPreventif modalAjoutOperationPreventif-open"
    }else{
      this.classCss = "modalAjoutOperationPreventif"
    }
  }

  request = {
    search: {
      libelle: ""
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,    
    limit: 10,
    page: 1,
  }
  operationPreventif: OperationPreventif;
  erreurOperationPreventif = {
    libelle: "",
  }
  //Get parametre of Operation Preventif
  tabLibelle = []
  allOperationPreventifs = []
  getAllParametres() {
    this.opeSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allOperationPreventifs = resultat.operationPreventifs
            for (let item of this.allOperationPreventifs) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  //Controller les champs de saisies
  controleInputs() {
    for (let key in this.erreurOperationPreventif) {
      this.erreurOperationPreventif[key] = ""
    }
    var isValid = true
    for (let key in this.erreurOperationPreventif) {
      if (this.operationPreventif[key] == "") {
        this.erreurOperationPreventif[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabLibelle.length; i++) {
      if (this.operationPreventif.libelle == this.tabLibelle[i]) {
        this.erreurOperationPreventif.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }

  //Save Operation Preventif
  enregistrerOperationPreventif() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.opeSe.create(this.operationPreventif,this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.notificationToast.showSuccess("Votre operationPreventif est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }
  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }
}
