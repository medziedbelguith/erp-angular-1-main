import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { MissionService } from 'src/app/services/serviceBD_GMAO/mission.service';

@Component({
  selector: 'app-ajout-mission',
  templateUrl: './ajout-mission.component.html',
  styleUrls: ['./ajout-mission.component.scss']
})
export class AjoutMissionComponent implements OnInit {
  missionFormGroup: FormGroup;
  lienAjoute = "/missions/newMission"
  objectKeys = Object.keys;

  request = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  mission = {
    libelle:"",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurMission = {
    libelle:"",
  }

  @Output() closeModalAjoutMission = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutMission = false
  
  closeAjoutMission(){
    this.closeModalAjoutMission.emit();
  }
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private missionSe: MissionService,
    private router : Router) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurMission){
      this.erreurMission[key] = ""
    }
    var isValid = true
    for(let key in this.erreurMission){
      if(this.mission[key] == ""){
        this.erreurMission[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutMission()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }  
    for(let key in this.mission){
      this.request[key] = this.mission[key]
    }   
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.missionSe.create(this.mission, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {       
            this.closeModalAjoutMission.emit()
            this.notificationToast.showSuccess("Votre CategorieMachine est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });  
  }
  //Get parametre of Frais Mission
  allMissions = []
  getAllParametres() {
    this.missionSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allMissions = resultat.missions
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  reseteFormulaire(){
    for(let key in this.erreurMission){
      this.mission[key] = ""
    }
  }
}
