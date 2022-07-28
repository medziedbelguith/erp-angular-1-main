import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import {formatDate} from '@angular/common';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-classement-client',
  templateUrl: './classement-client.component.html',
  styleUrls: ['./classement-client.component.scss']
})
export class ClassementClientComponent implements OnInit {
  formC:FormGroup

  apiList = "/articles/chiffreAffaires"
  
  listInputNotShow = ["chiffreAffaire"]
  
  constructor(private fb:FormBuilder, 
    private router:Router, private http: HttpClient, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {
   
    this.formC = this.fb.group({
      raisonSociale:[''],
      email:[''],
      chiffreAffaire:[''],
      code:[''],
      secteur:[''],
      limit:3
    })

    this.getClients(this.request)
    this.getSecteurs()
  }

  objectKeys = Object.keys;

  items = { 
    code:"active",
    raisonSociale:"active",
    email:"active",
    secteur:"active",
    chiffreAffaire:"active",
  };

  itemsVariable = { 
    code:"active",
    raisonSociale:"active",
    email:"active",
    secteur:"active",
    chiffreAffaire:"active",
  };

  request = { 
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd:  formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search:{
      secteur:"",
      raisonSociale:"",
      email:"",
      chiffreAffaire:"",
      code:"",
    },
    orderBy:{ 
      secteur:0,
      raisonSociale:0,
      email:0,
      chiffreAffaire:0,
      code:0,
    },
    societe : this.informationGenerale.idSocieteCurrent,
    limit: 3,
    page:1
  } 

  oldRequest = { 
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd:  formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search:{
      secteur:"",
      raisonSociale:"",
      email:"",
      chiffreAffaire:"",
      code:"",
    },
    orderBy:{ 
      secteur:0,
      raisonSociale:0,
      email:0,
      chiffreAffaire:0,
      code:0,
    },
    limit: 3,
    page:1
  } 

  ngOnInit(): void {
  }

  isLoading = false

  clients = []

  getClients(request) {
    
    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }

    this.request.limit = this.formC.value.limit

    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    
    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }
    
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if(resultat.status) {
          this.clients = resultat.resultat.docs      
          this.totalPage = resultat.resultat.pages 
          this.oldRequest = resultat.request
            
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getClients(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request)  || (this.request.page != resultat.request.page) ){
            this.getClients(this.request)
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

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getClients(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients(this.request)
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
    
    this.getClients(this.request)
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

  allSecteurs = []
  
  getSecteurs() {
    this.http.get(this.informationGenerale.baseUrl + "/clients/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allSecteurs = resultat.secteurs
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

 
  setSecteurActiviteID(event) {
    this.formC.patchValue({secteur:event.target.value})
    this.getClients(this.request)
  }

}
