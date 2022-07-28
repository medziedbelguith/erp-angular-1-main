import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router, NavigationEnd } from '@angular/router';
import {formatDate} from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
const parametres = require("../parametres.json");

@Component({
  selector: 'app-list-reglements',
  templateUrl: './list-reglements.component.html',
  styleUrls: ['./list-reglements.component.scss']
})
export class ListReglementsComponent implements OnInit {

  formC:FormGroup

  parametres = {
    typeReglement:"",
    apiDelete:"",
    apiList:"",
    pageDetails:"",
    pageModifie:"",
    pageAjoute:"",
    pageEcheance:"",
    titreAjouter:"",
    typeTier:"Client"
  }

  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres.apiDelete +"/"+this.idDeleteModal, {}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getReglements(this.request)
            this.closeModalDelete()
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La Reglement"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(private fb:FormBuilder, private router:Router, private http: HttpClient, public informationGenerale: InformationsService, public fonctionPartages:FonctionPartagesService) {
   
    this.formC = this.fb.group({
      numero:[''],
      client:[''],
      fournisseur:[''],
      notes:[''],
      dateEcheance:[''],
      numCheque:[''],
      dateReglement:[''],
      montant:[''],
      tresorerie:[''],
      modeReglement:[''],
      reste:[''],
      limit:10
    })

  }

  
  arrayObjets = ["client", "fournisseur"]

  gotToAdd(){
    this.router.navigate([this.parametres.pageAjoute]);
  }

  goToListEcheance(){
    this.router.navigate([this.parametres.pageEcheance]);
  }

  objectKeys = Object.keys;

  items = {    
    numero:"Numéro",
    client:"Client",
    fournisseur:"Fournisseur",
    modeReglement:"Mode-Reglement",
    tresorerie:"Trésorerie",
    montant:"Montant",
    reste:"Reste",
    dateReglement:"Date",
    numCheque:"Numéro Chèque",
    dateEcheance:"Date d'échéance",
    notes:"Notes"
  };

  itemsVariable = {   
    numero:"Numéro",
    client:"Client",
    fournisseur:"Fournisseur",
    modeReglement:"Mode-Reglement",
    tresorerie:"Trésorerie",
    montant:"Montant",
    reste:"Reste Liltrages",
    dateReglement:"Date",
    numCheque:"Numéro Chèque",
    dateEcheance:"Date d'échéance",
    notes:"Notes"
  };

  

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    magasin:"",
    typeReglement:"",
    search:{ 
      numero:"",
      client:"",
      fournisseur:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      reste:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      numero:0,
      client:0,
      fournisseur:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      reste:0,
      dateReglement:0,
      numCheque:0,
      dateEcheance:0,
      notes:0,
    },
    limit: 10,
    page:1
  } 

  oldRequest = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    magasin:"",
    typeReglement:"",
    search:{ 
      numero:"",
      client:"",
      fournisseur:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      reste:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      numero:0,
      client:0,
      fournisseur:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      reste:0,
      dateReglement:0,
      numCheque:0,
      dateEcheance:0,
      notes:0,
    },
    limit: 10,
    page:1
  }

  ngOnInit(): void {
    var key = this.router.url.replace("/reglement/", "")
    key = key.substring(0, key.indexOf('/'))
    this.parametres = parametres[key]
    if(this.parametres.typeTier == 'Client'){
       this.items.fournisseur = undefined
       this.itemsVariable.fournisseur = undefined
       delete(this.items.fournisseur)
       delete(this.itemsVariable.fournisseur)
    }else{
      this.items.client = undefined
      this.itemsVariable.client = undefined
      delete(this.items.client)
      delete(this.itemsVariable.client)
    }
    this.getReglements(this.request)
  }

  isLoading = false

  reglements = []

  getReglements(request) {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }

    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    this.request.limit = this.formC.value.limit
    this.request.magasin = this.informationGenerale.idSocieteCurrent
    this.request.typeReglement = this.parametres.typeReglement

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.reglements = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getReglements(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getReglements(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2){
    for(let key in request1.search){
      if(request1.search[key] != request2.search[key]){
        return false
      }
    }
 
    for(let key in request1.orderBy){
      if(request1.orderBy[key] != request2.orderBy[key]){
        return false
      }
    }
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getReglements(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getReglements(this.request)
  }

  printout() {
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    newWindow.print();
  }

  stringToHtml(str) {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el;
  };

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  generatePDF() {
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

    <style>
    th,td{
      text-align:center;
      border: black 1px solid;
    } 
    body{
      padding:50px;
    }

    h1{
      text-align:center;
    }
    </style>
  </head>
  <body>

  <h1> Tableaux de clients </h1>

  <table style="width:100%">
  <tr>
  </tr>
  `

    for (let i = 0; i < this.reglements.length; i++) {
      chaine +=
        `<tr>
      </tr>`
    }
    chaine += `
  </table>
</body>
</html>
`
     return chaine;
  }
  fileName= 'ExcelSheet.xlsx';  
  exportexcel(){
    /* table id is passed over here */   
    let element = document.getElementById('output'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
	}

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.request.orderBy[key] == 1){
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.request.orderBy){
      if(key != varkey){
         this.request.orderBy[varkey] = 0
      }
    }
    
    this.getReglements(this.request)
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
}
