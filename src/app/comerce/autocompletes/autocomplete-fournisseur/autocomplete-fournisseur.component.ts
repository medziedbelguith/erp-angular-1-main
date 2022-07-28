import { ActivatedRoute } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {Component, OnInit, Input, Output, EventEmitter,  ViewChild, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-autocomplete-fournisseur',
  templateUrl: './autocomplete-fournisseur.component.html',
  styleUrls: ['./autocomplete-fournisseur.component.scss']
})
export class AutocompleteFournisseurComponent implements OnInit {

  selected=false;

  ngOnInit() {
  }

  constructor(
    private modalService: NgbModal,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    public fonctionPartages:FonctionPartagesService,
    ) {
  }

  items = {
    code: "Code",
    raisonSociale: "Raison Sociale",
  }

  keySelected = "raisonSociale"

  idFournisseur = ""
  
  pageDetails = null

  itemsNumberSimple = {}
  itemsNumberQuantite = {}

  @Input() bordureRed = false

  @Input() idHtml = "1"

  @Input() idSelected=""
  @Output() addElementEvent = new EventEmitter<string>();

  apiList = "/fournisseurs/listFournisseurs"

  setFournisseur(id){
    this.idFournisseur = id 
  }


  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
  }

  listFournisseur(){
    this.typeElement = this.fonctionPartages.titreOfModal.listFournisseur
    this.isOpenModalAjoutElement = true
  }

  selectionLigneFunction(id){
    this.idFournisseur = id
    this.closeModalAjoutElement()
  }

  detailsFournisseur(){
    if(this.idFournisseur.length == 0){
      alert("Aucun fournisseur seclectionner")
      return
    } 

    this.idAjoutElementModal = this.idFournisseur
    this.typeElement = this.fonctionPartages.titreOfModal.detailsFournisseur
    this.isOpenModalAjoutElement = true
  }

  @Input() articles = [
    {id:"1", name:"article1", description:"description1", categorie:"categorie1"},
    {id:"2", name:"article2", description:"description2", categorie:"categorie2"},
    {id:"3", name:"article3", description:"description3", categorie:"categorie3"},
  ]
  

}
