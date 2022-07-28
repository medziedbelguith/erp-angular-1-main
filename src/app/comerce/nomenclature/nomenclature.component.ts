import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {

  formC: FormGroup
  constructor(
    private http: HttpClient,
    private informationGenerale: InformationsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fnctModel: FnctModelService,
    private notificationToast: ToastNotificationService,
  ) {
    this.formC = this.fb.group({
      reference: [''],
      codeBarre: [''],
      designation: [''],
      typeArticle: [''],
      categorie: [''],
      famille: [''],
      sousFamille: [''],
      marque: [''],
      modele: [''],
      prixFourn: [''],
      remiseF: [''],
      marge: [''],
      prixVenteHT: [''],
      tauxTVA: [''],
      montantTVA: [''],
      prixAchat: [''],
      valeurStock: [''],
      qteEnStock: [''],
      prixTTC: [''],
      plafondRemise: [''],
      pVenteConseille: [''],
      enVente: [''],
      enAchat: [''],
      refFournisseur: [''],
      redevance: [''],
      enBalance: [''],
      enPromotion: [''],
      enNouveau: [''],
      longueur: [''],
      largeur: [''],
      hauteur: [''],
      surface: [''],
      volume: [''],
      enDisponible: [''],
      enArchive: [''],
      enVedette: [''],
      enLiquidation: [''],
      description: [''],
      seuilRearpQTS: [''],
      qteTheorique: [''],
      quantite: [''],

      limit: 10
    })
    this.getAllParametres()
  }

  ngOnInit(): void {
  }
  article
  //autocomplete Article
  erreurArticle = {
    quantiteVente: "",
    reference: "",
    prixVenteHTReel: "",
  }
  shemaMultiSortie = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix HT",
    prixTTC: "Prix TTC"
  }
  keySelectedArticle = "reference"
  shemaArticle2 = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT",
    tauxTVA: "tauxTVA(%)",
    prixTTC: "Montant TTC",
    qteEnStock: "Qte En Stock",
    qteTheorique: "Qte Theorique",
    plafondRemise: "Plafond Remise",
    pVenteConseille: "Prix Vente Conseille",
    enVente: "Vente",
    enAchat: "Achat",
    description: "Description",
  }
  itemArticleSelected = {
    article: "61c0692eb670950c58fff815",
    sansRemise: "non",
    numero: 0,
    reference: "",
    designation: "",
    marge: 0,
    remiseF: 0,
    prixFourn: 0,
    isFodec: "non",
    prixFodec: 0,
    tauxDC: 0,
    prixDC: 0,
    totalFrais: 0,
    redevance: 0,
    prixAchat: 0,
    prixVenteHT: 0,
    prixVenteHTReel: 0,

    tauxRemise: 0,
    totalRemise: 0,

    totalHT: 0,
    tauxTVA: 0,

    totalGain: 0,

    totalTVA: 0,
    totalTTC: 0,

    totalRedevance: 0,

    prixTTC: 0,

    quantiteVente: 0,
    unite: "",
    pVenteConseille: 0,
    plafondRemise: 0,

    unite1: "",
    unite2: "",
    coefficient: 0,

    quantiteALivree: 0,

    societe: ""
  }
  shemaArticle2Number = {
    marge: '',
    tauxTVA: '',
    prixTTC: '',
    pVenteConseille: '',
    plafondRemise: ''
  }
  shemaArticle2Quantite = {
    qteEnStock: '',
    qteTheorique: ''
  }
  allSousArticle = []
  setArticleID(id) {
    this.article = id
    this.allSousArticle = this.allArticles.filter((x) => x.id != id)
  }
  setSousArticleID(id) {
    let test = this.allSousArticle.filter((x) => x.id == id)[0]
    this.sousArticle = {
      numero: this.id++,
      sousArticleId: test.id,
      reference: test.reference,
      designation: test.designation,
      prixVenteHT: test.prixVenteHT,
      qteEnStock: test.qteEnStock,
      quantite: this.sousArticle.quantite,
    }
  }
  //open modal ajout Article
  isOpenModalAjoutArticle = false
  idAjoutArticleModal = ""
  closeModalAjoutArticle() {
    this.isOpenModalAjoutArticle = false
    //this.getAllParametres()
  }
  openModalAjoutArticle() {
    this.isOpenModalAjoutArticle = true
  }

  //get all parametre
  allArticles = []
  apiParametres = "/articles/listArticlesSociete"
  request = {
    search: {
      reference: "",
      codeBarre: "",
      designation: "",
      typeArticle: "",
      categorie: "",
      famille: "",
      sousFamille: "",
      marque: "",
      modele: "",
      prixFourn: "",
      remiseF: "",
      marge: "",
      prixVenteHT: "",
      tauxTVA: "",
      montantTVA: "",
      prixAchat: "",
      valeurStock: "",
      qteEnStock: "",
      prixTTC: "",
      plafondRemise: "",
      pVenteConseille: "",
      enVente: "",
      enAchat: "",
      refFournisseur: "",
      redevance: "",
      enBalance: "",
      enPromotion: "",
      enNouveau: "",
      longueur: "",
      largeur: "",
      hauteur: "",
      surface: "",
      volume: "",
      enDisponible: "",
      enArchive: "",
      enVedette: "",
      enLiquidation: "",
      description: "",
      observations: "",
      poids: "",
      couleur: "",
      unite1: "",
      unite2: "",
      coefficient: "",
      emplacement: "",
      raccourciPLU: "",
      prixVenteHT2: "",
      prixVenteHT3: "",
      seuilAlerteQTS: "",
      seuilRearpQTS: "",
      qteTheorique: ""
    },
    orderBy: {
      reference: 0,
      codeBarre: 0,
      designation: 0,
      typeArticle: 0,
      categorie: 0,
      famille: 0,
      sousFamille: 0,
      marque: 0,
      modele: 0,
      prixFourn: 0,
      remiseF: 0,
      marge: 0,
      prixVenteHT: 0,
      tauxTVA: 0,
      montantTVA: 0,
      prixAchat: 0,
      valeurStock: 0,
      QteEnStock: 0,
      prixTTC: 0,
      plafondRemise: 0,
      pVenteConseille: 0,
      enVente: 0,
      enAchat: 0,
      refFournisseur: 0,
      redevance: 0,
      enBalance: 0,
      enPromotion: 0,
      enNouveau: 0,
      longueur: 0,
      largeur: 0,
      hauteur: 0,
      surface: 0,
      volume: 0,
      enDisponible: 0,
      enArchive: 0,
      enVedette: 0,
      enLiquidation: 0,
      description: 0,
      observations: 0,
      poids: 0,
      couleur: 0,
      unite1: 0,
      unite2: 0,
      coefficient: 0,
      emplacement: 0,
      raccourciPLU: 0,
      prixVenteHT2: 0,
      prixVenteHT3: 0,
      seuilAlerteQTS: 0,
      seuilRearpQTS: 0,
      qteTheorique: 0
    },
    limit: 10,
    page: 1,
    societe: ""
  }
  getAllParametres() {
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.apiParametres, this.request).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.resultat.docs
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  objectKeys = Object.keys;
  isDetails = "0"
  items = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT",
    qteEnStock: "Qte En Stock",
    quantite: "Qte Commande",
  };
  itemsVariable = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT",
    qteEnStock: "Qte En Stock",
    quantite: "Qte Commande",
  };
  modalReference: NgbModalRef;
  options2: NgbModalOptions = {
    container: '.session-modal-container'
  };
  public visible = false;
  closeResult = '';
  id = 0
  sousArticle = {
    numero: 0,
    sousArticleId: "",
    reference: "",
    designation: "",
    prixVenteHT: 0,
    qteEnStock: 0,
    quantite: 0,
  }
  erreurSousArticle = {
    sousArticleId: "",
    quantite: "",
  }
  open(content) {
    this.sousArticle = {
      numero: 0,
      sousArticleId: "",
      reference: "",
      designation: "",
      prixVenteHT: 0,
      qteEnStock: 0,
      quantite: 0,
    }
    this.erreurSousArticle = {
      sousArticleId: "",
      quantite: "",
    }
    this.modalReference = this.modalService.open(content, this.options2);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  listGL = []
  enregistrerSousArticle() {
    if (!this.fnctModel.controleInputN(this.erreurSousArticle, this.sousArticle)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    this.listGL.push(this.sousArticle)
    this.JoinAndClose()
  }
  JoinAndClose() {
    this.modalReference.close();
  }

  tabEmpty = []
  sousArticles
  inisialiserEmptyTab() {
    this.tabEmpty = []
    if (this.sousArticles) {
      for (let i = 0; i < (6 - this.sousArticles.length); i++) {
        this.tabEmpty.push({})
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.tabEmpty.push({})
      }
    }

    return true
  }
  modifierSousArticle(id) {
    if (!this.fnctModel.controleInput(this.erreurSousArticle, this.sousArticle)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
    //ajouter service
    this.JoinAndClose()
  }

  openModifier(content, sousArticle) {
    this.modalReference = this.modalService.open(content, sousArticle);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  
  supprimerSousArticle(id) {
    this.listGL = this.listGL.filter((x) => x.numero != id)
  }

  lienAjoute = "/articles/newSousArticle/"
  valider()
  {
    if(this.listGL.length == 0)
    {
      this.notificationToast.showError("Veuillez remplir des sous articles !")
      return
    }
    let LGSousArticle = []
    let id = this.article
    for(let item of this.listGL)
    {
      LGSousArticle.push({article : item.sousArticleId, quantite: item.quantite})
    }
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute+id, LGSousArticle).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre sous articles sont bien ajoutés !")
        }else{
            this.notificationToast.showError(resultat.message)
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );   
  }
}
