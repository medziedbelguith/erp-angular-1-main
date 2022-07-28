import { PersonnelService } from './../../../services/serviceBD_Commerce/personnel.service';
import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { Personnel } from 'src/app/model/modelCommerce/personnel';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-personnel',
  templateUrl: './ajout-personnel.component.html',
  styleUrls: ['./ajout-personnel.component.scss']
})
export class AjoutPersonnelComponent implements OnInit {

  personnelFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = new Personnel()

  personnel = new Personnel()
  
  erreurPersonnel = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
  }

  @Output() closeModalAjoutPersonnel = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutPersonnel = false

  
  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutPersonnel){
      for (let key in this.erreurPersonnel) {
        this.erreurPersonnel[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.personnel) {
        this.personnel[key] = ""
      }

      this.getAllParametres()
    }
  }
  
  closeAjoutArticle(){
    this.closeModalAjoutPersonnel.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    private personnelSe: PersonnelService,
    private fnctModel: FnctModelService,
    public informationGenerale: InformationsService) 
    {
    }

  ngOnInit(): void {
  }

  isLoading = false
  ajoutPersonnel() {
    if (!this.fnctModel.controleInputs(this.erreurPersonnel, this.personnel,this.tabEmails, 'email')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.personnel) {
      this.request[key] = this.personnel[key]
    }
  
    if (this.isLoading) {
      return
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.isLoading = true
    this.personnelSe.create(this.personnel, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre personnel est bien enregistrée !")
            if(this.isPopup){
              this.closeAjoutArticle()
            }else{
              this.router.navigate(['/personnel/list']);
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  reseteFormulaire() {
    for (let key in this.erreurPersonnel) {
      this.personnel[key] = ""
    }
  }

  allRoles = []
  allPersonnels = []
  tabEmails = []
  getAllParametres() {
    this.personnelSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
            this.allPersonnels = resultat.personnels
            for (let item of this.allPersonnels) {
              this.tabEmails.push(item.email)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
}
