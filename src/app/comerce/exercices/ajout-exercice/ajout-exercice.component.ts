import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-exercice',
  templateUrl: './ajout-exercice.component.html',
  styleUrls: ['./ajout-exercice.component.scss']
})
export class AjoutExerciceComponent implements OnInit {
  exerciceFormGroup: FormGroup;
  lienAjoute = "/exercices/newExercice"
  objectKeys = Object.keys;

  request = {
    exercice:0,
    societe:""
  }

  exercice = {
    exercice:0,
    societe:""
  }

  erreurExercice = {
    exercice:"",
  }

  @Output() closeModalAjoutExercice = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutExercice = false

  closeAjoutExercice(){
    this.closeModalAjoutExercice.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutExercice){

      this.erreurExercice = {
        exercice:"",
      }

      if(document.getElementById("exercice") != null){
        document.getElementById("exercice").classList.remove("border-erreur")
      }

      this.getAllParametres()
      this.exercice = {
        exercice:0,
        societe:""
      }
    }
  }
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private router: Router,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
  }

  exercices = []

  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + "/exercices/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.exercices = resultat.exercices
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

  isLoading = false

  ajoutExercice()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for(let key in this.exercice){
      this.request[key] = this.exercice[key]
    }   
    this.request.societe = this.informationGenerale.idSocieteCurrent   
    
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre Exercice est bien enregistrée !")
            this.closeAjoutExercice()
          }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurExercice){
      this.exercice[key] = ""
    }
  }
}
