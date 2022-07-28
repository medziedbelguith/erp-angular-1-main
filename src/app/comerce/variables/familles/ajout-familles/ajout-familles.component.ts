import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Famille } from 'src/app/model/modelCommerce/famille';
import { FamilleService } from 'src/app/services/serviceBD_Commerce/famille.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { SousFamilleService } from 'src/app/services/serviceBD_Commerce/sousFamille.service';

@Component({
  selector: 'app-ajout-familles',
  templateUrl: './ajout-familles.component.html',
  styleUrls: ['./ajout-familles.component.scss']
})
export class AjoutFamillesComponent implements OnInit {
  familleFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = {
    libelle:"",
    sousFamilles:[],
    societe:"",
    categorie:""
  }

  famille = new Famille()

  erreurFamille = {
    libelle:"",
  }

  @Output() closeModalAjoutFamille = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() idCategorie = ""
 
  @Input() isOpenModalAjoutFamille = false

  titre = "famille"
  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutFamille){
      this.getSousFamilles()

      for (let key in this.erreurFamille) {
        this.erreurFamille[key] = ""
        
        if(document.getElementById(this.titre + key) != null){
          document.getElementById(this.titre + key).classList.remove("border-erreur")
        }
      }

      for (let key in this.famille) {
        this.famille[key] = ""
      }
    }
  }

  closeAjoutFamille(){
    this.closeModalAjoutFamille.emit();
  }

  constructor(
    private familleSer: FamilleService,
    private sousFamilleSer: SousFamilleService,
    private fnctModel: FnctModelService,
    private fonctionPartagesService:FonctionPartagesService, 
    private notificationToast:ToastNotificationService, 
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres() 
  }

  isLoading = false
  ajoutFamille()
  {   
    if (!this.fnctModel.controleInputs(this.erreurFamille, this.famille, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for(let key in this.famille){
      this.request[key] = this.famille[key]
    }   

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.categorie = this.idCategorie

    var listId = []
    for(let i = 0; i < this.sousfamillesSelected.length; i++){
      listId.push({id:this.sousfamillesSelected[i].id})
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.request.sousFamilles = listId  
    this.familleSer.create(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre famille est bien enregistrée !")
            this.closeAjoutFamille()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }
  
  reseteFormulaire(){
    for(let key in this.erreurFamille){
      this.famille[key] = ""
    }
  }
  
  sousfamilles = []
  sousfamillesSelected = []
  allFamilles = []

  addSousFamille(item){
    this.sousfamillesSelected.push(item)
    this.sousfamilles = this.sousfamilles.filter(x => x.id != item.id)
  }

  removeSousFamille(item){
    this.sousfamillesSelected = this.sousfamillesSelected.filter(x => x.id != item.id)
  }

  addSousFamilleSelected(item){
    this.sousfamilles.push(item)
  }

  removeSousFamilleSelected(item){
    this.sousfamillesSelected = this.sousfamillesSelected.filter(x => x.id != item.id)
    this.sousfamilles.push(item)
  }

  checkAllSelect()
  {
    this.sousfamilles.push.apply(this.sousfamilles, this.sousfamillesSelected);
    this.sousfamillesSelected = []
  }
  checkAll(){
    this.sousfamillesSelected.push.apply(this.sousfamillesSelected, this.sousfamilles);
    this.sousfamilles = []
  }
  motRecherche = ""

  recherche(){
    if(this.motRecherche != ""){
     this.sousfamilles = this.allFamilles.filter(x => x.libelle.toUpperCase().indexOf(this.motRecherche.toUpperCase()) == 0)
    }else{
     this.sousfamilles = this.allFamilles
    }

    for (let i= 0;i < this.sousfamillesSelected.length; i++) {
      this.sousfamilles = this.sousfamilles.filter( x => x.id != this.sousfamillesSelected[i].id)
     }
  }

  isCheked(item){
    if(this.sousfamillesSelected.filter(x => x.id == item.id).length == 1){
      return true
    }
    return false
  }

  getSousFamilles() {
      
    if (this.isLoading) {
      return
    }
    this.sousfamilles = []
   
    let requestFamilles = {
      page:1,
      limit:100000,
      search:{},
      orderBy:{},
      societe:this.informationGenerale.idSocieteCurrent
    }
    this.isLoading = true
    this.sousFamilleSer.getAll(requestFamilles)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.sousfamilles = resultat.resultat.docs
          this.allFamilles = resultat.resultat.docs
          for (let i= 0;i < this.sousfamillesSelected.length; i++) {
            this.sousfamilles = this.sousfamilles.filter( x => x.id != this.sousfamillesSelected[i].id)
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getSousFamilles()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterSousFamille
    this.isOpenModalAjoutElement = true
  }

    //Get parametre of Famille
    tabLibelle = []
    allFamillees = []
    getAllParametres() {
      this.familleSer.parametre(this.informationGenerale.idSocieteCurrent)
        .subscribe(
          res => {
            let resultat: any = res
            if (resultat.status) {
              this.allFamillees = resultat.familles
              for (let item of this.allFamillees) {
                this.tabLibelle.push(item.libelle)
              }
            }
          },
          error => {
            this.isLoading = false
            alert("Désole, ilya un problème de connexion internet")
          });
    }

}
