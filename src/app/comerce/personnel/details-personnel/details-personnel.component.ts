import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { Personnel } from 'src/app/model/modelCommerce/personnel';
import { PersonnelService } from 'src/app/services/serviceBD_Commerce/personnel.service';

@Component({
  selector: 'app-details-personnel',
  templateUrl: './details-personnel.component.html',
  styleUrls: ['./details-personnel.component.scss']
})
export class DetailsPersonnelComponent implements OnInit {
  lienGetById = "/personnels/getById/"

  objectKeys = Object.keys;

  @Output() closeModalModifierPersonnel = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierPersonnel = false

  closeModifierPersonnel(){
    this.closeModalModifierPersonnel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierPersonnel == true){
     
      for (let key in this.personnel) {
        this.personnel[key] = ""
      }

      if (this.id.length > 1) {
        this.getAllParametres()
        this.getPersonnel(this.id)
      }
    }
  }

  request = new Personnel()

  personnel = new Personnel()

  constructor(
    public informationGenerale: InformationsService,
    private personnelSe: PersonnelService,) {
    
  }

  isLoading = false
  getPersonnel(id) {
    this.isLoading = true
    this.personnelSe.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.personnel) {
              this.personnel[key] = this.request[key]
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  allRoles = []
  getAllParametres() {
    this.personnelSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  getRole(id){
     var rolesSelected =  this.allRoles.filter(x => x.id == id)
      if(rolesSelected.length > 0){
        return rolesSelected[0].libelle
      }else{
        return ""
      }
  }

  ngOnInit(): void {
    if(this.id.length > 1){
      this.getPersonnel(this.id)
    }
  }
}
