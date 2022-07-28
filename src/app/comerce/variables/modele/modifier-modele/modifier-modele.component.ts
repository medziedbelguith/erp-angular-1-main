import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-modifier-modele',
  templateUrl: './modifier-modele.component.html',
  styleUrls: ['./modifier-modele.component.scss']
})
export class ModifierModeleComponent implements OnInit {
  modeleFormGroup: FormGroup;

  lienModifie = "/modeles/modifierModele/"
  lienGetById = "/modeles/getById/"

  objectKeys = Object.keys;
  @Output() closeModalModifierModele = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierModele = false

  closeModifierModele(){
    this.closeModalModifierModele.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierModele == true){
      for (let key in this.erreurModele) {
        this.erreurModele[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modele) {
        this.modele[key] = ""
      }

      if (this.id.length > 1) {
        this.getModele(this.id)
      }
    }
  }

  request = {
    libelle: "",
    marque: "",
  }

  modele = {
    libelle: "",
    marque: "",
  }

  erreurModele = {
    libelle: "",
  }
  
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router, private fonctionPartagesService:FonctionPartagesService) {
  }

  getModele(id) {
    
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          for (let key in this.modele) {
            this.modele[key] = response.resultat[key]
          }
          this.marquesCurrent = this.marques.filter(x => x.modele == this.modele.marque)
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

  controleInputs() {
   
    for(let key in this.erreurModele){
      this.erreurModele[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    for(let key in this.request){
      if(this.request[key].length == 0 && this.modele[key] == ""){
        this.erreurModele[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }   

    return isValid
  }

  isLoading = false

  ModifierModele()
  { 

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   
    
    for (let key in this.modele) {
      this.request[key] = this.modele[key]
    }
    
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.modele).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre modele est bien modifiée !")
            this.closeModifierModele()
          }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }

    );  

  }
  
  reseteFormulaire(){
    for(let key in this.erreurModele){
      this.modele[key] = ""
    }
  }

  //getAllParametres
  getAllParametres()
  {   
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + "/modeles/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.isLoading = false
          this.marques = resultat.marques
        }
      }, err => {
      }
    );  
  }  
  
  marques = []
  marquesCurrent = []
  //autocomplete marque
  keySelectedMarque = "libelle"
  
  objetMarque = {
    libelle:"active",   
  }

  setMarqueID(id){
    this.modele.marque = id
  }

  listAutoComplete = ['marque']

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  
  openModalAjoutMarque(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMarque
    this.isOpenModalAjoutElement = true
  }

  

}
