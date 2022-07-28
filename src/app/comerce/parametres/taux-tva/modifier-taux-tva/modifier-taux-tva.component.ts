import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-taux-tva',
  templateUrl: './modifier-taux-tva.component.html',
  styleUrls: ['./modifier-taux-tva.component.scss']
})
export class ModifierTauxTvaComponent implements OnInit {
  tauxTVAFormGroup: FormGroup;

  lienModifie = "/tauxTVAs/modifierTauxTVA/"
  lienGetById = "/tauxTVAs/getById/"

  objectKeys = Object.keys;

  @Output() closeModalModifierTauxTva = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierTauxTva = false

  closeModifierTauxTva(){
    this.closeModalModifierTauxTva.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierTauxTva == true){
      for (let key in this.erreurTauxTVA) {
        this.erreurTauxTVA[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      this.tauxTVA = {
        taux:0,
        libelle:"",
        societe:""
      }

      if (this.id.length > 1) {
        this.getTauxTVA(this.id)
      }
    }
  }

  request = {
    taux:0,
    libelle:"",
    societe:""
  }

  tauxTVA = {
    taux:0,
    libelle:"",
    societe:""
  }

  erreurTauxTVA = {
    taux:"",
  }
  
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router,
    private notificationToast:ToastNotificationService) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  getTauxTVA(id) {  
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.tauxTVA) {
            this.tauxTVA[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    
  }

  controleInputs() {
    for(let key in this.erreurTauxTVA){
      this.erreurTauxTVA[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }   
    var isValid = true
    
    if(this.tauxTVA.taux < 0){
      var key = 'taux'
      this.erreurTauxTVA[key] = "Veuillez remplir ce champ"
      isValid = false
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.add("border-erreur")
      }
    }
  
    return isValid
  }

  isLoading = false

  modifierTauxTVA() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.tauxTVA) {
      this.request[key] = this.tauxTVA[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.request.societe = undefined
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeModifierTauxTva()
          this.notificationToast.showSuccess("Le taux de TVA est bien modifiée !")
        }else{
          this.notificationToast.showError("Le taux de TVA existe déjà !!")
          var key = 'taux'
          this.erreurTauxTVA[key] = "Le taux de TVA existe déjà !!"
          if(document.getElementById(key) != null){
            document.getElementById(key).classList.add("border-erreur")
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurTauxTVA) {
      this.tauxTVA[key] = ""
    }
  }

}
