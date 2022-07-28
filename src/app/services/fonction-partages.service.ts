import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from './informations.service';
import { TokenStorageService } from './authentication/token-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FonctionPartagesService {

  private idAutocomplite: BehaviorSubject<string>;

  getValue(): Observable<string> {
    return this.idAutocomplite.asObservable();
  }
  
  setValue(newValue): void {
    this.idAutocomplite.next(newValue);
  }

  constructor(
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService) {

      this.tokenStorageService.getUser()
      this.getConfiguration()
      this.idAutocomplite = new BehaviorSubject<string>("");
 
  }

  lienGet = "/parametres/getConfiguration"
 
  getConfiguration()
  {   
    let request = {
      societe : this.informationGenerale.idSocieteCurrent,
      idUserCurrent : this.tokenStorageService.getUser()?.id
    }
    
    this.http.post(this.informationGenerale.baseUrl + this.lienGet, request).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
            this.setParametres(resultat.resultat)
            this.tokenStorageService.saveUser(resultat.user)
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }

  setParametres(parametres){
    this.parametres = parametres
  }

  parametres = {
    nombreChiffresApresVerguleNormale:3,
    nombreChiffresApresVerguleQuantite:3,
    prixTimbreFiscale:0.6,
    tauxFodec:1,
    coefficientRetenueImpot:1.5,
  }

  colonnesQuantites = ["qteAncienne", "qteDifference", "qteNouvelle", "quantiteMax", "quantiteMin", "qteEnStock", "qteTheorique"]

  colonnesPrix = ["montant", "reste", "impactPrix", "impactPoids", "budget", "trajet", "totalGain", "totalTTC","tFiscale","totalTVA","totalHT","totalRemise", "prixVenteHT", "valeurRetiree", "taux", "prixFourn", "remiseF", "marge", "prixVenteHT", "tauxTVA", "montantTVA", "prixAchat", "prixAchatTTC", "valeurStock", "prixTTC", "plafondRemise", "pVenteConseille", "redevance", "longueur", "largeur", "hauteur", "surface", "volume", "poids", "coefficient", "prixVenteHT2", "prixVenteHT3", "seuilAlerteQTS", "seuilRearpQTS", "plafondCredit", "credit"]

  colonnesDates = ["dateReglement", "dateEcheance", "date","dateDebut","dateFin"]

  colonnesOuiNon = ["enCours","tierNecessaire", "enVente", "enAchat", "enBalance", "enPromotion", "enNouveau", "enDisponible", "enArchive", "enVedette", "enLiquidation"]

  modeTiere = {
    client:"Client",
    fournisseur:"Fournisseur",
  }

  titreCrud = {
    ajouter:"Ajouter",
    modifier:"Modifier",
    transfert:"Transfert",
    details:"Details",
  }

  titreDocuments = {
    bonLivraison:"Bon Livraison",
    devis:"Devis",
    commande:"Commande",
    bonCommande:"Bon Commande",
    bonAchat:"Bon Achat",
    bonRetourClient:"Bon Retour Client",
    bonRetourFournisseur:"Bon Retour Fournisseur",
  }

  pageDetails = {
    fournisseur:"/fournisseur/details/"
  }

  getLibelleById(id, items, keySelected){
    for(let i=0; i < items.length; i++ ){
      if(items[i].id == id ){
        return items[i][keySelected]
      } 
    }
  }

  getLibelleByKey(id, items, keySelected, keyFilter){
    for(let i=0; i < items.length; i++ ){
      if(items[i][keyFilter] == id ){
        return items[i][keySelected]
      } 
    }
  }

  getIdOfArrayElement(items , key){
    let ok = false
    while(!ok){
      let id = this.getIdAleatoire()
      ok = items.filter(x => x[key] == id).length == 0
      if(ok){
        return id
      }
    }
  }

  orderByDocuments(itemsVariableGOrderby, items){
    var orderBySelected = ""
    for(let varkey in  itemsVariableGOrderby){
      if(itemsVariableGOrderby[varkey] != 0){
        orderBySelected = varkey
      }
    } 

    for(let i = 0 ; i < items.length; i++){
      var selected = i
      
      for(let j = i ; j < items.length; j++){
        if(itemsVariableGOrderby[orderBySelected] == 1){
          if(items[selected][orderBySelected] < items[j][orderBySelected]){
            selected = j
          }
        }else{
          if(items[selected][orderBySelected] > items[j][orderBySelected]){
            selected = j
          }
        } 
      }
      var aux = items[i]
      items[i] = items[selected]
      items[selected] = aux

    }

    return items
  }

  activationCroissante(buttons1, buttons2){
    var buttons = document.getElementsByClassName("croissante");

    for(let i = 0; i < buttons.length; i++){
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante","")
      buttons[i].setAttribute("class", classList) 
    }
   
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante","")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }


  getIdAleatoire() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  
  getDate(date, format){
    if(!(date && date.length && date.length > 1)){
         return ""
    }
    return formatDate(new Date(date), format, 'en');
  }

  getFormaThreeAfterVerguleNomber(float){
    var number = Number(float);
    return number.toFixed(this.parametres.nombreChiffresApresVerguleNormale)
  }

  getFormaThreeAfterVerguleQuantite(float){
    var number = Number(float);
    return number.toFixed(this.parametres.nombreChiffresApresVerguleQuantite)
  }

  showInput(event){
    var element2 = document.getElementById(event.target.getAttribute('name'))
    element2.focus()
    event.target.parentElement.classList.add("desactive-text")
    this.resetDesactiveInput(event.target.getAttribute('name'))
  }

  showInput2(event){
    let name = event.target.getAttribute('ng-reflect-name')
    if(name == null){
      name = event.target.getAttribute('name')
    }
    
    var element2 = document.getElementById(name)
    element2.focus()

    event.target.parentElement.classList.add("desactive-text")
    this.resetDesactiveInput(name)
  }

  blurInput2(event){
    let name = event.target.getAttribute('ng-reflect-name')
    if(name == null){
      name = event.target.getAttribute('name')
    }
    
    event.target.parentElement.classList.remove("desactive-text")
  }

  resetDesactiveInput(id){
    var elements = document.getElementsByClassName("desactive-text")
    for(let i = 0; i < elements.length; i++){
      if(elements[i].children[0].id != id){
        elements[i].classList.remove("desactive-text")
      }
    }
    this.resetAutoCompletes("")
  }

  resetAutoCompletes(id){
    this.setValue(id)
  }

  inisialiserEmptyTab(items){
    var tabEmpty = []
    if(items){
      for(let i = 0; i < (6 - items.length); i++){
        tabEmpty.push({})
      }
    }else{
      for(let i = 0; i < 6; i++){
        tabEmpty.push({})
      }
    }

    return tabEmpty
  }
  
  titreOfModal = {
    modifierUniteMesure:"Modifier Unité de Mesure",
    modifierTransporteur:"Modifier Transporteur",
    ajouterTransporteur:"Ajouter Transporteur",
    ajouterCategorie:"Ajouter Categorie",
    modifierCategorie:"Modifier Categorie",
    ajouterUniteMesure:'Ajouter Unité de Mesure',
    ajouterMarque:'Ajouter Marque',
    ajouterModele:'Ajouter Modele',
    modifierModele:'Modifier Modele',
    modifierMarque:'Modifier Marque',
    ajouterFamille:'Ajouter Famille',
    modifierFamille:'Modifier Famille',
    ajouterSousFamille:'Ajouter Sous Famille',
    modifierSousFamille:'Modifier Sous Famille',
    ajouterArticle:'Ajouter Article',
    ajouterExercice:'Ajouter Exercice',
    modifierExercice:'Modification Exercice',
    ajouterClient:'Ajouter Client',
    ajouterFournisseur:'Ajouter Fournisseur',
    ajouterModeReglement:'Ajouter Mode Reglement',
    modifierModeReglement:'Modifier Mode Reglement',
    ajouterModeLivraison:'Ajouter Mode Livraison',
    modifierModeLivraison:'Modifier Mode Livraison',
    ajouterUtilisateur:'Ajouter Utilisateur',
    modifierUtilisateur:'Modifier Utilisateur',
    detailsUtilisateur:'Details Utilisateur',
    ajouterTypeContact:'Ajouter Type Contact',
    modifierTypeContact:'Modifier Type Contact',
    ajouterPersonnel:'Ajouter Personnel',
    modifierPersonnel:'Modifier Personnel',
    detailsPersonnel:'Details Personnel',
    ajouterTauxTva:'Ajouter Taux Tva',
    modifierTauxTva:'Modifier Taux Tva',
    ajouterSecteur:'Ajouter Secteur',
    modifierSecteur:'Modifier Secteur',
    ajouterTypeTier:'Ajouter Type Tier',
    modifierTypeTier:'Modifier Type Tier',
    ajouterTypeCompte:'Ajouter Type Compte',
    modifierTypeCompte:'Modifier Type Compte',
    ajouterStatuOpportunite:'Ajouter Statu Opportunite',
    modifierStatuOpportunite:'Modifier Statu Opportunite',
    ajouterProjetInterne:'Ajouter projet interne',
    modifierProjetInterne:'Modifier projet interne',
    ajouterOrdreEmission:'Ajouter ordre de mission',
    modifierOrdreEmission:'Modifier ordre de mission',
    modifierVariante:'Modifier Variante',
    ajouterVariante:'Ajouter Variante',
    ajouterAgentPremierContact:'Ajouter Agent Premier Contact',
    ajouterAgentCommercial:'Ajouter Agent Commercial',
    ajouterAgentRecouvrement:'Ajouter Agent Recouvrement',
    voirHistoriqueAchat:'Historique de achat d"un article',
    voirHistoriqueVente:'Historique de vente d"un article',
    ajouterPrixSpecifique:'ajouterPrixSpecifique',
    modifierPrixSpecifique:'modifierPrixSpecifique',

    ajouterCaisse:'Ajouter Caisse',
    modifierCaisse:'Modifier Caisse',

    ajouterSessionCaisse:'Ajouter session caisse',
    
    detailsFournisseur:'Details Fournisseur',
    modifierFournisseur:'Modifier Fournisseur',
    listFournisseur:'Liste Fournisseur',

    ajouterOperationPreventif:'Ajouter Operation Preventif',
    ajouterMachine:'Ajouter Machine',
    ajouterPeriodicite:'Ajouter Periodicite',
    ajouterPlanPreventif:'Ajouter Plan Preventif',
    ajouterTechnicien:'Ajouter Technicien',
    ajouterEtatTache:'Ajouter EtatTache',
    ajouterTypeFrais:'Ajouter TypeFrais',
    ajouterMission:'Ajouter Mission', 
    ajoutChauffeur:'Ajouter Chauffeur', 
    ajoutVehicule:'Ajouter Vehicule', 
    ajoutCharge:'Ajouter Charge', 

    ajouterClasse:'Ajouter Classe',

    lignePrixSpecifique:"Prix Specifique"
    
    
   
  }

}

