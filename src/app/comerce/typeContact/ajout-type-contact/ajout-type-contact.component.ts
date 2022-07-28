import { Component, OnInit,  Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-type-contact',
  templateUrl: './ajout-type-contact.component.html',
  styleUrls: ['./ajout-type-contact.component.scss']
})
export class AjoutTypeContactComponent implements OnInit {
  typeContactFormGroup: FormGroup;
  lienAjoute = "/typeContacts/newTypeContact"
  objectKeys = Object.keys;

  request = {
    libelle:"",
    societeRacine:""
  }

  typeContact = {
    libelle:"",
    societeRacine:""
  }

  erreurTypeContact = {
    libelle:"",
  }


  titre = "TypeContact"

  @Output() closeModalAjoutTypeContact = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutTypeContact = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutTypeContact == true){
      for (let key in this.erreurTypeContact) {
        this.erreurTypeContact[key] = ""
        
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeContact) {
        this.typeContact[key] = ""
      }
    }
  }


  closeAjoutTypeContact(){
    this.closeModalAjoutTypeContact.emit();
  }


  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private router:Router,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
  }
  controleInputs() {
    for(let key in this.erreurTypeContact){
      this.erreurTypeContact[key] = ""
      if(document.getElementById(this.titre+key) != null){
        document.getElementById(this.titre+key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    for(let key in this.erreurTypeContact){
      if(this.typeContact[key] == ""){
        this.erreurTypeContact[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.add("border-erreur")
        }
      }
    }   
    return isValid
  }

  isLoading = false

  ajoutTypeContact()
  {   

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }    
    for(let key in this.typeContact){
      this.request[key] = this.typeContact[key]
    }   
    if (this.isLoading) {
      return
    }
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutTypeContact()
          this.notificationToast.showSuccess("Votre typeContact est bien enregistrée !")
          }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurTypeContact){
      this.typeContact[key] = ""
    }
  }
}
