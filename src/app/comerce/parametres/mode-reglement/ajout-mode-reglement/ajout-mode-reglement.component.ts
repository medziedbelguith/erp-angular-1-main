import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-mode-reglement',
  templateUrl: './ajout-mode-reglement.component.html',
  styleUrls: ['./ajout-mode-reglement.component.scss']
})

export class AjoutModeReglementComponent implements OnInit {
  modeReglementFormGroup: FormGroup;
  lienAjoute = "/modeReglements/newModeReglement"
  objectKeys = Object.keys;

  request = { 
    libelle:"",
    ordre:0,
    valeurRetiree:0,
    tierNecessaire:"oui",
    enCours:"non",
    image:"",
    societe:this.informationGenerale.idSocieteCurrent,
  }

  modeReglement = {
    libelle:"",
    ordre:0,
    valeurRetiree:0,
    tierNecessaire:"oui",
    enCours:"non",
    image:"",
    societe:this.informationGenerale.idSocieteCurrent,
  }

  erreurModeReglement = {
    libelle:"",
  }

  @Output() closeModalAjoutModeReglement = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutModeReglement = false

  titre="modeReglement"

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutModeReglement == true){
      for (let key in this.erreurModeReglement) {
        this.erreurModeReglement[key] = ""
        
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modeReglement) {
        this.modeReglement[key] = ""
      }      
      this.annulerImage()
    }
  }
  
  closeAjoutModeReglement(){
    this.closeModalAjoutModeReglement.emit();
  }

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private fnctModel: FnctModelService,
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService) 
    { 
      this.getAllParametres()
    }

  ngOnInit(): void {
  }

  controleInputs(){
    for(let key in this.erreurModeReglement){
      this.erreurModeReglement[key] = ""
      if(document.getElementById(this.titre+key) != null){
        document.getElementById(this.titre+key).classList.remove("border-erreur")
      }
    }  
    var isValid = true
    for(let key in this.erreurModeReglement){
      if(this.modeReglement[key] == ""){
        if(document.getElementById(this.titre+key) != null){
          document.getElementById(this.titre+key).classList.add("border-erreur")
        }
        this.erreurModeReglement[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false
  ajoutModeReglement(){
    if(this.isLoading){
      return 
    }
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    this.isLoading = true; 
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
      this.modeReglement.image = ""
      this.envoyerRequest()
    }
  }

  envoyerRequest()
  {   
    if (!this.fnctModel.controleInputs(this.erreurModeReglement, this.modeReglement,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.modeReglement){
      this.request[key] = this.modeReglement[key]
    }  
    this.request.societe=this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res        
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre modeReglement est bien enregistrée !")
            this.closeAjoutModeReglement()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurModeReglement){
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
    this.componentField = null
    //document.getElementById('fileInput').setAttribute("value", null)
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

  tabLibelle = []
  allModeReglements = []
  lienParametres = "/modeReglements/getAllParametres/"
  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienParametres + this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.allModeReglements = resultat.modeReglements
          this.tabLibelle = []
          for (let item of this.allModeReglements) {
            this.tabLibelle.push(item.libelle)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
}
