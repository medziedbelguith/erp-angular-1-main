import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modifier-exercice',
  templateUrl: './modifier-exercice.component.html',
  styleUrls: ['./modifier-exercice.component.scss']
})
export class ModifierExerciceComponent implements OnInit {
  exerciceFormGroup: FormGroup;

  lienModifie = "/exercices/modifierExercice/"
  lienGetById = "/exercices/getById/"


  id="";
  objectKeys = Object.keys;

  clickIsEnCours(){
    if(this.exercice.isEnCours == "oui"){
      this.exercice.isEnCours = "non"
    }else{
      this.exercice.isEnCours = "oui"
    }
  }

  request = {
    exercice:0,
    isEnCours:""
  }

  exercice = {
    exercice:0,
    isEnCours:""
  }

  erreurExercice = {
    exercice:""
  }

  @Output() closeModalModifierExercice = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() idModifierExerciceModal = ""

  @Input() isOpenModalModifierExercice = false

  closeAjoutExercice(){
    this.closeModalModifierExercice.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierExercice){

      this.exercice = {
        exercice:0,
        isEnCours:"oui"
      }

      this.erreurExercice = {
        exercice:"",
      }

      if(document.getElementById("exercice") != null){
        document.getElementById("exercice").classList.remove("border-erreur")
      }

      this.id = this.idModifierExerciceModal

      if(this.id.length > 1){
        this.getExercice(this.id)
      }
      
    }
  }

  exercices = []

  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + "/exercices/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.exercices = resultat.exercices.filter(x => x.id != this.id)
        }
      }, err => {
        this.isLoading = false
      }
    );
  }
  
  controleInputs() {
    for(let key in this.erreurExercice){
      this.erreurExercice[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    if(this.exercices.filter(x => x.exercice == this.exercice.exercice).length > 0){
      this.erreurExercice.exercice = "Cette année existe déjà"
      isValid = false
      if(document.getElementById("exercice") != null){
        document.getElementById("exercice").classList.add("border-erreur")
      }
    }else if(this.exercice.exercice < 1800 || this.exercice.exercice > 3000){ 
      this.erreurExercice.exercice = "Veuillez remplir une année entre 1800 et 3000"
      isValid = false
      if(document.getElementById("exercice") != null){
        document.getElementById("exercice").classList.add("border-erreur")
      }
    }
    
    return isValid
  }


  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router,) {
  }

  getExercice(id) {
    
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.exercice) {
            this.exercice[key] = this.request[key]
          }

          this.getAllParametres()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    
  }

  isLoading = false

  modifierExercice() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.exercice) {
      this.request[key] = this.exercice[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre exercice est bien modifiée !")
             this.closeAjoutExercice()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurExercice) {
      this.exercice[key] = ""
    }
  }
}
