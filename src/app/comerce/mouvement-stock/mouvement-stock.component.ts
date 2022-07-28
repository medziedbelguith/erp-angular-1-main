import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { formatDate } from '@angular/common';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.scss']
})
export class MouvementStockComponent implements OnInit {

  formC: FormGroup

  apiListR = "/reglements/getByIdClient/"
  apiList = "/societes/listSocietes"

  listInputNotShow = ["chiffreAffaire"]

  constructor(private fb: FormBuilder,
    private router: Router, private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService) {

    this.formC = this.fb.group({
      day1: [''],
      day2: [''],
      allMagasins: [''],

      magasin: [''],

      limit: 10
    })
    this.getMagasins()
  }

  objectKeys = Object.keys;
  mouvementStock={
   magasin:"",
  }
  
  items = {
    magasin: "active",
  };

  itemsVariable = {
    magasin: "active",
  };

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      magasin: "",
    },
    orderBy: {
      magasin: 0,
    },
    limit: 3,
    page: 1
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
      search: {
        magasin: "",
      },
      orderBy: {
        magasin: 0,
      },
      limit: 3,
      page: 1
  }

  ngOnInit(): void {
  }

  getMouvementStock(request)
  {

  }
  //Get all Magasins
  isLoading = false
  getMagasins() {
    this.http.post(this.informationGenerale.baseUrl + "/societes/listSocietes",this.request).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allMagasins = resultat.resultat.docs
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  //Debut autocom Magasin
  allMagasins = []

  keySelectedMagasin = "raisonSociale"

  objetMagasin = {
    raisonSociale: "active",
    matriculeFiscale: "active",
    responsable: "active",
    cinResponable: "active",
    telephones: "active",
    mobiles: "active",
    fax: "active",
    localite: "active",
    email: "active",
    pays: "active",
    gouvernorat: "active",
    delegation: "active",
    codePostale: "active",
    societeParent: null,
  }

  setMagasinID(id) {
    this.mouvementStock.magasin = id
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

    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getMouvementStock(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getMouvementStock(this.request)
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }
    this.getMouvementStock(this.request)
  }


  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");

    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }

    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
