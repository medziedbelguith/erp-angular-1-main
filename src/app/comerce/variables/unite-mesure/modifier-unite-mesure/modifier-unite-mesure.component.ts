import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-unite-mesure',
  templateUrl: './modifier-unite-mesure.component.html',
  styleUrls: ['./modifier-unite-mesure.component.scss']
})
export class ModifierUniteMesureComponent implements OnInit {
  uniteMesureFormGroup: FormGroup;

  lienModifie = "/uniteMesures/modifierUniteMesure/"
  lienGetById = "/uniteMesures/getById/"

  @Output() closeModalModifierUniteMesure = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierUniteMesure = false

  closeModifierUniteMesure(){
    this.closeModalModifierUniteMesure.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierUniteMesure == true){
      for (let key in this.erreurUniteMesure) {
        this.erreurUniteMesure[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.uniteMesure) {
        this.uniteMesure[key] = ""
      }

      if (this.id.length > 1) {
        this.getUniteMesure(this.id)
      }
    }
  }


  objectKeys = Object.keys;

  request = {
    libelle:"",
    code:"",
    societeRacine:""
  }

  uniteMesure = {
    libelle:"",
    code:"",
    societeRacine:""
  }

  erreurUniteMesure = {
    libelle:"",
    code:"",
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  getUniteMesure(id) {   
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.uniteMesure) {
            this.uniteMesure[key] = this.request[key]
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
    for (let key in this.erreurUniteMesure) {
      this.erreurUniteMesure[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true

    for (let key in this.erreurUniteMesure) {
      if (this.uniteMesure[key] == "") {
        this.erreurUniteMesure[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }
    return isValid
  }

  isLoading = false

  modifierUniteMesure() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
    for (let key in this.uniteMesure) {
      this.request[key] = this.uniteMesure[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.request.societeRacine = this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeModifierUniteMesure()
          this.notificationToast.showSuccess("Votre uniteMesure est bien modifiée !") 
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurUniteMesure) {
      this.uniteMesure[key] = ""
    }
  }

}
