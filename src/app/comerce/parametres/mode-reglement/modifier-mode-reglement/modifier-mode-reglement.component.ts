import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-modifier-mode-reglement',
  templateUrl: './modifier-mode-reglement.component.html',
  styleUrls: ['./modifier-mode-reglement.component.scss']
})
export class ModifierModeReglementComponent implements OnInit {
  modeReglementFormGroup: FormGroup;

  lienModifie = "/modeReglements/modifierModeReglement/"
  lienGetById = "/modeReglements/getById/"

  
  objectKeys = Object.keys;
  @Output() closeModalModifierModeReglement = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierModeReglement = false

  closeModifierModeReglement(){
    this.closeModalModifierModeReglement.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierModeReglement == true){
      for (let key in this.erreurModeReglement) {
        this.erreurModeReglement[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modeReglement) {
        this.modeReglement[key] = ""
      }

      this.annulerImage()

      if (this.id.length > 1) {
        this.getModeReglement(this.id)
      }

    }
  }

  request = { 
    libelle:"",
    ordre:0,
    valeurRetiree:0,
    tierNecessaire:"oui",
    enCours:"oui",
    image:"",
    societe:this.informationGenerale.idSocieteCurrent,
  }

  modeReglement = {
    libelle:"",
    ordre:0,
    valeurRetiree:0,
    tierNecessaire:"oui",
    enCours:"oui",
    image:"",
    societe:this.informationGenerale.idSocieteCurrent,
  }

  erreurModeReglement = {
    libelle:"",
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

  }

  getModeReglement(id) {  
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.modeReglement) {
            this.modeReglement[key] = this.request[key]
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
    for (let key in this.erreurModeReglement) {
      this.erreurModeReglement[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurModeReglement) {
      if (this.modeReglement[key] == "") {
        this.erreurModeReglement[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }
    return isValid
  }

  isLoading = false

  modifierModeReglement() {
   if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    if(this.isLoading){
      return 
    }
    
    this.isLoading = true;

    if(!this.imageSelected){
      this.envoyerRequest()
    }

    if(this.imageSelectedSource){ 
      const formData = new FormData();
      this.isLoading = true
      formData.append('myFiles', this.imageSelectedSource)
      
      this.http.post(this.informationGenerale.baseUrl+"/modeReglements/upload", formData).subscribe(
        res => {
          var arrayImages: any = res
          if(arrayImages.length > 0){
            this.modeReglement.image = arrayImages[0]
            this.envoyerRequest()
          }else{
            this.isLoading = false;
            return 
          }
        }, err => {
          this.isLoading = false;
          return 
        }
      );
    }else{
      this.envoyerRequest()
    }
  }

  envoyerRequest()
  {   
    for(let key in this.modeReglement){
      this.request[key] = this.modeReglement[key]
    }
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeModifierModeReglement()
          this.notificationToast.showSuccess("Votre modeReglement est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  
  }

  reseteFormulaire() {
    for (let key in this.erreurModeReglement) {
      this.modeReglement[key] = ""
    }
  }

  
  // Gestion des photos --debut--
  multiImage
  imageSelected
  imageSelectedSource
  componentField

  annulerImage(){
    this.imageSelected = null
    this.imageSelectedSource = null
    this.modeReglement.image = ""
    this.componentField = null
  }

  selectedM(event) {
     this.multiImage = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.imageSelectedSource = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imageSelected = reader.result
     }
  }

  // Gestion des photos --fin--

  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },10)
  }

  fixedVerguleNumbers(){
    this.modeReglement.valeurRetiree = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.modeReglement.valeurRetiree))
  }

}
