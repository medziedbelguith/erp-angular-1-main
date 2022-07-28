import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-type-contact',
  templateUrl: './modifier-type-contact.component.html',
  styleUrls: ['./modifier-type-contact.component.scss']
})
export class ModifierTypeContactComponent implements OnInit {
  typeContactFormGroup: FormGroup;

  lienModifie = "/typeContacts/modifierTypeContact/"
  lienGetById = "/typeContacts/getById/"
  
  objectKeys = Object.keys;

  @Output() closeModalModifierTypeContact = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierTypeContact = false

  closeModifierTypeContact(){
    this.closeModalModifierTypeContact.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierTypeContact == true){
      for (let key in this.erreurTypeContact) {
        this.erreurTypeContact[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeContact) {
        this.typeContact[key] = ""
      }

      if (this.id.length > 1) {
        this.getTypeContact(this.id)
      }
    }
  }

  request = {
    libelle:"",
    societeRacine:""
  }

  typeContact = {
    libelle:"",
    societeRacine:""
  }

  erreurTypeContact = {
    libelle:""
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router:Router,
    private notificationToast:ToastNotificationService) {

  }

  getTypeContact(id) {   
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.typeContact) {
            this.typeContact[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ngOnInit(): void {
   
  }

  controleInputs() {
    for (let key in this.erreurTypeContact) {
      this.erreurTypeContact[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in this.erreurTypeContact) {
      if (this.typeContact[key] == "") {
        this.erreurTypeContact[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }
    return isValid
  }

  isLoading = false

  modifierTypeContact() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
    for (let key in this.typeContact) {
      this.request[key] = this.typeContact[key]
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
          this.closeModifierTypeContact()
          this.notificationToast.showSuccess("Votre TypeContact est bien modifiée !")
  
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurTypeContact) {
      this.typeContact[key] = ""
    }
  }
}
