import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Frais } from 'src/app/model/modelCommerce/frais';
import { InformationsService } from 'src/app/services/informations.service';
import { FraisService } from 'src/app/services/serviceBD_Commerce/frais.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-frais',
  templateUrl: './modifier-frais.component.html',
  styleUrls: ['./modifier-frais.component.scss']
})
export class ModifierFraisComponent implements OnInit {

  fraisFormGroup: FormGroup;

  id="";
  objectKeys = Object.keys;

  request = new Frais()

  frais = new Frais()

  erreurFrais = {
    type:""
  }
  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private fraisServ : FraisService,
    private router: Router,) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getAllParametres()
  }

  getFrais(id) {
    this.isLoading = true
    this.fraisServ.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.frais) {
            this.frais[key] = this.request[key]
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème ggg de connexion internet")
      });

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getFrais(this.id)
    }
  }

  allFraiss = []
  getAllParametres(){
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent       
    this.fraisServ.parametre(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allFraiss = resultat.fraiss 
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème ggg de connexion internet")
      });
  }

  controleInputs() {
    for (let key in this.erreurFrais) {
      this.erreurFrais[key] = ""
    }
    var isValid = true
    for (let key in this.frais) {
      if (this.frais[key] == "") {
        this.erreurFrais[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.frais.type != ""){
      console.log(this.allFraiss)
      if(this.allFraiss.filter(x => x.type == this.frais.type).length > 0){
        this.erreurFrais.type = "Ce type est déjà utilisée !!"
        isValid = false
        if(document.getElementById('type') != null){
          document.getElementById('type').classList.add("border-erreur")
        }
      }
    }
    return isValid
  }

  isLoading = false

  modifierFrais() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
    for (let key in this.frais) {
      this.request[key] = this.frais[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.fraisServ.update(this.id,this.frais, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre frais est bien modifiée !")
             this.router.navigate(['variable/frais/list']);
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  reseteFormulaire() {
    for (let key in this.erreurFrais) {
      this.frais[key] = ""
    }
  }

  clickDirect(){
    if(this.frais.direct == "oui"){
      this.frais.direct = "non"
    }else{
      this.frais.direct = "oui"
    }
  }

}