import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ligne-inventaire',
  templateUrl: './ligne-inventaire.component.html',
  styleUrls: ['./ligne-inventaire.component.scss']
})
export class LigneInventaireComponent implements OnInit {

  @Input() articles
  @Input() allArticles
  @Input() isLoading
  
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  lienGetById = "/articles/getByIdCategorie/"

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService) {

  }

  ngOnInit(): void {
  }
  
  lienAjoute = "/articles/newArticle"
  erreurArticle = {
    qteTeorique: "",
    qteInv1: "",
    qteInv2: "",
    qteInv3: "",
    qteInvValide: "",
    notes: "",
  }

  objectKeys = Object.keys;
  // begin autocomplete articles
  itemArticleSelected = {
    reference: "",
    designation: "",
    numero: 1,
    qteTeorique: 0,
    qteInv1: 0,
    qteInv2: 0,
    qteInv3: 0,
    qteInv1IsValid: "non",
    qteInv2IsValid: "non",
    qteInv3IsValid: "non",
    qteInvValide: 0,
    notes: "",
    prixAchat: 0,
    tauxRemise: 0,
    montantRemise: 0,
    prixVenteHT: 0,
    quantiteVente: 0,
    unite: "",
    totalRemise: 0,
    totalHT: 0,
    tauxTVA: 0,
    totalTVA: 0,
    redevance: 0,
    totalTTC: 0,
    pVenteConseille: 0,
    article: "",
  }
  
  //pour list article dans autocomplite
  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    lot: "Lot/Numero serie",
    qteTheorique: "Qte Théorique",
    qteEnStock: "Qte En stock",
    qteInv1: "Quantite INV1",
    qteInv2: "Quantite INV2",
    qteInv3: "Quantite INV3",
    qteInvValide: "QteINV valide",
    notes: "Notes",
  }

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  // end autocomplete articles

  //begin delete item
  numeroItemDelete = 0

  tabNumbers = []
  allTabNumbers = ['qteInv1', 'qteInv2', 'qteInv3', 'qteInvValide']
  tabCoches = ['qteInv1', 'qteInv2', 'qteInv3']
  tabQTV = ['qteInvValide']
  fixedVerguleNumbers() {
    for (let j = 0; j < this.tabNumbers.length; j++) {
      this.itemArticleSelected[this.tabNumbers[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.itemArticleSelected[this.tabNumbers[j]])
    }
  }

  showInput2(event) {
    this.fonctionPartagesService.showInput2(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  resetDesactiveInput(id) {
    this.fonctionPartagesService.resetDesactiveInput(id)
  }

  deplaceLigne(numero, pas) {
    var newPos = numero + pas
    if (newPos == 0) {
      newPos = 0
    }
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  
  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }
  
  printout() {
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    newWindow.print();
    // window.print();
  }
  
  stringToHtml(str) {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el;
  };
  
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  generatePDF() {
    /*
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    */
    var data = window.document.getElementById("output");

    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf();
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }

  getDataToHtml() {
    var chaine = ""

    chaine = `
    
    <html id="monitor">
   <head>
    <meta charset="utf-8">
    <title>Ma page de test</title>
  `

    chaine += `
  </table>
</body>
</html>

`
    return chaine;
  }
  fileName = 'ExcelSheet.xlsx';
  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('output');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  ajoutQTV(valeur, item, key, key2, key3) {
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].article == item.article && this.articles[i].lot == item.lot && this.articles[i].sousProduit == item.sousProduit) {
        this.articles[i].qteInvValide = valeur
        if(item[key] == "oui"){
          this.articles[i][key] = "non"
        }else{
          this.articles[i][key] = "oui"
        }
        this.articles[i][key2] = "non"
        this.articles[i][key3] = "non"
      }
    }
  }

  changePrixValidee(){
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].qteInv1IsValid == "oui") {
        this.articles[i].qteInvValide = this.articles[i].qteInv1
      }else if (this.articles[i].qteInv2IsValid == "oui") {
        this.articles[i].qteInvValide = this.articles[i].qteInv2
      }else if (this.articles[i].qteInv3IsValid == "oui") {
        this.articles[i].qteInvValide = this.articles[i].qteInv3
      }else{
        this.articles[i].qteInvValide = 0
      }
    }
  }

  // start modal sous produit
  titreCrud = "Ajouter"
  modalReference: NgbModalRef;
  closeResult = '';
  titre = "sousProduit";

  sousProduit = {
    sousProduit: "",
    reference: "",
  }

  erreurSousProduit = {
    reference:"",
  }

  open(content, item) {
    
    this.titreCrud = "Ajouter"
    this.sousProduit = {
      sousProduit: "",
      reference: "",
    }

    this.erreurSousProduit = {
      reference:"",
    }

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openModifier(content, sousProduit) {
    
    this.sousProduit = {
      sousProduit: "",
      reference: "",
    }

    this.erreurSousProduit = {
      reference:"",
    }
    
    this.titreCrud = "Modifier"

    for(let key in this.sousProduit){
      if(key != 'variantes'){
        this.sousProduit[key] = sousProduit[key]
      }else{
        for(let key2 in sousProduit[key]){
          this.sousProduit[key][key2] = sousProduit[key][key2]
        }
      }
    }
    

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  controleInputs() {
 
    /*for(let key in this.erreurSousProduit){
      this.erreurSousProduit[key] = ""
      if(document.getElementById(this.titre + key)){
        document.getElementById(this.titre + key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    if(this.sousProduit.variantes.length == 0){
      this.erreurSousProduit['variantes'] = "Veuillez inserer Votres variantes !!"
      if(document.getElementById(this.titre + 'variantes')){
        document.getElementById(this.titre + 'variantes').classList.add("border-erreur")
      }
      isValid = false
    }

    if(this.sousProduit.reference == ""){
      this.erreurSousProduit['reference'] = "Veuillez inserer votre référence !!"
      if(document.getElementById(this.titre + 'reference')){
        document.getElementById(this.titre + 'reference').classList.add("border-erreur")
      }
      isValid = false
    }

    if(this.titreCrud == "Ajouter"){
      if(this.sousProduits?.filter(x => x.reference == this.sousProduit.reference).length > 0 && this.sousProduit.reference != ""){
        this.erreurSousProduit['reference'] = "Votre référence existe déjà !!"
        if(document.getElementById(this.titre + 'reference')){
          document.getElementById(this.titre + 'reference').classList.add("border-erreur")
        }
        isValid = false
      }
    }else{
      if(this.sousProduits?.filter(x => x.reference == this.sousProduit.reference && x.id != this.sousProduit.id ).length > 0 && this.sousProduit.reference != ""){
        this.erreurSousProduit['reference'] = "Votre référence existe déjà !!"
        if(document.getElementById(this.titre + 'reference')){
          document.getElementById(this.titre + 'reference').classList.add("border-erreur")
        }
        isValid = false
      }
    }
    

    return isValid*/
  }

  enregistrerSousProduit() {
    /*if (!this.controleInputs()) {
      return
    }

    this.sousProduit.id = this.fonctionPartagesService.getIdOfArrayElement(this.sousProduits, 'id')

    this.sousProduits.push(this.sousProduit);  
    
    this.sousProduit = {
      id:"",
      reference: "",
      variantes:[],
      impactPrix:0,
      impactPoids:0
    }
    this.JoinAndClose()
    */
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = this.fonctionPartagesService.inisialiserEmptyTab(this.articles)
  
    return true
  }

  getStyle(item){
    if(item.numero != 0){
      return "background-color:white;"
    }else{
      return "background-color: rgba(64, 26, 231, 0.30);"
    }
  }

  getStyleDropDown(item){
      if(item.numero == 0 && item.isShow == 0){
        return "display:none;"
      }else{
        return "display:block;"
      }
  }

  dropDown(numero){
     var ok = false
     var i = 0
     while(ok == false && i < this.articles.length){
        if(this.articles[i].numero == numero){
          var ok2 = false
          ok = true
          var j = i
          if(this.articles[i].isShow == 0){
            this.articles[i].isShow = 1
          }else{
            this.articles[i].isShow = 0
          }
          i++
          while(ok2 == false && i < this.articles.length){
              if(this.articles[i].numero == 0){
                this.articles[i].isShow = this.articles[j].isShow
              }else{
                ok2 = true
              }
              i++
          }
        } 
        i++
     }

  }

  modifierSousProduit() {
    /*
    if (!this.controleInputs()) {
      return
    } 
   
    this.supprimerSousProduit(this.sousProduit.id)
    
    this.sousProduits.push({
      id:this.sousProduit.id,
      reference:this.sousProduit.reference,
      variantes:this.sousProduit.variantes,
      impactPrix:this.sousProduit.impactPrix,
      impactPoids:this.sousProduit.impactPoids
    });  
    
    this.sousProduit = {
      id: "",
      reference: "",
      variantes:[],
      impactPrix:0,
      impactPoids:0
    }
    this.JoinAndClose()
*/
  }

  supprimerSousProduit(id){
   /* for(let i = 0; i < this.sousProduits.length; i++){
      if(this.sousProduits[i].id == id){
        this.sousProduits.splice(i,1);
      }
    }*/
  }

  // end modal sous produit

}
