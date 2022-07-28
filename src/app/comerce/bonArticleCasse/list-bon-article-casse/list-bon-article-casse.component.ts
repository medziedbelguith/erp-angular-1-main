import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-list-bon-article-casse',
  templateUrl: './list-bon-article-casse.component.html',
  styleUrls: ['./list-bon-article-casse.component.scss']
})
export class ListBonArticleCasseComponent implements OnInit {
  formBL:FormGroup

  apiDelete = "/bonArticleCasses/deleteBonArticleCasse"
  apiList = "/bonArticleCasses/listBonArticleCasses"
  
  pageDetails = "/bonArticleCasse/details/"
  pageModifie = "/bonArticleCasse/modifier/"
  pageAjoute = "/bonArticleCasse/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete +"/"+this.idDeleteModal, {}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getBonArticleCasses(this.request)
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre bonArticleCasse est bien supprimée !")
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
    this.params1Delete = "Le bonArticleCasse"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  
  constructor(private fb:FormBuilder, 
    private router:Router, private http: HttpClient, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService) {
   
    this.formBL = this.fb.group({
      numero:[''],
      date:[''],
      article:[''],
      cas:[''],
      magasin:[''],
      quantite:[''],
      prixUnitaire:[''],
    
      limit:5
    })
    this.getBonArticleCasses(this.request)
  }

  gotToAdd(){
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  itemsNotShowInput = ["magasinArrive","magasinDepart", "date"]

  items = {     
    numero:"active",
    date:"active",
    article:"active",
    cas:"active",
    magasin:"active",
    quantite:"active",
    prixUnitaire:"active",
  };

  itemsVariable = { 
    numero:"active",
    date:"active",
    article:"active",
    cas:"active",
    magasin:"active",
    quantite:"active",
    prixUnitaire:"active",
  };

  request = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:0,
      date:"",
      article:"",
      cas:"",
      magasin:"",
      quantite:0,
      prixUnitaire:0,
    },
    orderBy:{ 
      numero:0,
      date:0,
      article:0,
      cas:0,
      magasin:0,
      quantite:0,
      prixUnitaire:0,
    },
    limit: 5,
    page:1
  } 

  oldRequest = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:0,
      date:"",
      article:"",
      cas:"",
      magasin:"",
      quantite:0,
      prixUnitaire:0,
    },
    orderBy:{ 
      numero:0,
      date:0,
      article:0,
      cas:0,
      magasin:0,
      quantite:0,
      prixUnitaire:0,
    },
    limit: 5,
    page:1
  } 
  
  ngOnInit(): void {
  }

  isLoading = false

  bonArticleCasses = []

  getBonArticleCasses(request) {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    this.request.limit = this.formBL.value.limit

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.bonArticleCasses = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getBonArticleCasses(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getBonArticleCasses(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
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

    if(request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd){
      return false
    }
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getBonArticleCasses(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getBonArticleCasses(this.request)
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

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
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

  <h1> Tableaux de bonArticleCasses </h1>

  <table style="width:100%">
  <tr>
    <th>#</th>
    <th>Nom</th>
    <th>Téléphone</th>
    <th>Email</th>
  </tr>
  `

    for (let i = 0; i < this.bonArticleCasses.length; i++) {
      chaine +=
        `<tr>
        <td>`+ this.bonArticleCasses[i].num + `</td>
        <td>`+ this.bonArticleCasses[i].nom + `</td>
        <td>`+ this.bonArticleCasses[i].telephone + `</td>
        <td>`+ this.bonArticleCasses[i].email + `</td>
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
    
    this.getBonArticleCasses(this.request)
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
