import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiUtilisateurService } from 'src/app/services/serviceBD_Comerce/api-utilisateur-services/api-utilisateur.service';
import { Utilisateur } from '../../Models/utilisateur/utilisateur'

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent implements OnInit {
  utilisateurFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierUtilisateur = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierUtilisateur = false

  closeModifierUtilisateur(){
    this.closeModalModifierUtilisateur.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if(this.isOpenModalModifierUtilisateur == true){
      
      

      if(document.getElementById("lienBlock1") != null) document.getElementById("lienBlock1").classList.add('class-utilisateur-activer');
      if(document.getElementById("block2") != null) document.getElementById("block2").classList.add('desactive-block'); 
      if(document.getElementById("lienBlock2") != null) document.getElementById("lienBlock2").classList.remove('class-utilisateur-activer'); 
      if(document.getElementById("block1") != null) document.getElementById("block1").classList.remove('desactive-block');
      for (let key in this.erreurUtilisateur) {
        this.erreurUtilisateur[key] = ""
        if(document.getElementById(key) != null) document.getElementById(key).classList.remove("border-erreur")
      }
      this.password = ""
      this.confirmPassword = ""
      this.erreurPassword = ""
      this.erreurConfirmPassword = ""
      
      for (let key in this.erreurUtilisateur) {
        this.erreurUtilisateur[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.utilisateur) {
        this.utilisateur[key] = ""
      }
        
      this.getAllParametres()
    
    }
  }

  request:Utilisateur

  utilisateur:Utilisateur
  
  erreurUtilisateur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    login:""
  }

  isLoading = false

  roles = []

  password = ""
  confirmPassword = ""
  
  erreurPassword = ""
  erreurConfirmPassword = ""

  controleInputMotdePasse(){
    this.erreurPassword = ""
    this.erreurConfirmPassword = ""
    document.getElementById("confirmationPasswordM").classList.remove("border-erreur")
    document.getElementById("passwordM").classList.remove("border-erreur")
    
    if(this.password == ""){
      document.getElementById("passwordM").classList.add("border-erreur")
      this.erreurPassword =  "Veuillez remplir ce champ"
      return false
    }

    if(this.password != this.confirmPassword){
      document.getElementById("confirmationPasswordM").classList.add("border-erreur")
      this.erreurConfirmPassword =  "Veuillez répéter votre mot de passe."
      return false
    }

    return true
  }
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router:Router,
    private notificationToast: ToastNotificationService,
    private apiUtilisateurService: ApiUtilisateurService) {

    this.request = new Utilisateur()
    this.utilisateur = new Utilisateur()
  }

  getUtilisateur(id) {
    this.isLoading = true
    this.apiUtilisateurService.getUser(id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.request) {
            this.request[key] = response.resultat[key]
          }
          this.utilisateur = this.request
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
    for (let key in this.erreurUtilisateur) {
      this.erreurUtilisateur[key] = ""
      document.getElementById(key).classList.remove("border-erreur")
    }

    var isValid = true
    for (let key in this.erreurUtilisateur) {
      if (this.utilisateur[key] == "") {
        this.erreurUtilisateur[key] = "Veuillez remplir ce champ"
        document.getElementById(key).classList.add("border-erreur")
        isValid = false
      }
    }

    return isValid
  }

  modifierUtilisateurMotPasse() {

    if (!this.controleInputMotdePasse()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
   
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.apiUtilisateurService.modifierMotdePasse(this.id, {password: this.password}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre mot de passe est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  modifierUtilisateur() {

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.utilisateur) {
      this.request[key] = this.utilisateur[key]
    }
    if (this.isLoading) {
      return
    }

    this.request.password = undefined
      
    this.isLoading = true

    this.apiUtilisateurService.modifierUser(this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre utilisateur est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  getAllParametres(){
   
    this.isLoading = true

    let request = {societe:this.informationGenerale.idSocieteCurrent}

    this.apiUtilisateurService.getAllParametres(request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.roles = resultat.roles
          if (this.id.length > 1) {
            this.getUtilisateur(this.id)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }
  
  reseteFormulaire() {
    for (let key in this.erreurUtilisateur) {
      this.utilisateur[key] = ""
    }
  }
  
}
