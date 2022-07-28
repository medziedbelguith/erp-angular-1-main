import { Component,  OnInit,  Input, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiUtilisateurService } from 'src/app/services/serviceBD_Comerce/api-utilisateur-services/api-utilisateur.service';
import { Utilisateur } from '../../Models/utilisateur/utilisateur'
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {
  utilisateurFormGroup: FormGroup;
 
  objectKeys = Object.keys;

  request:Utilisateur

  utilisateur:Utilisateur

  erreurUtilisateur ={
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    password: "",
    login:""
  }

  erreurConfirmationPassword = ""
  confirmationPassword = ""

  isLoading = false

  roles = []

  @Output() closeModalAjoutUtilisateur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutUtilisateur = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutUtilisateur == true){
      this.getAllParametres()
      for (let key in this.erreurUtilisateur) {
        this.erreurUtilisateur[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.utilisateur) {
        this.utilisateur[key] = ""
      }
    }
  }

  closeAjoutUtilisateur(){
    this.closeModalAjoutUtilisateur.emit();
  }

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private apiUtilisateurService:ApiUtilisateurService,
    private router: Router) {
      this.request = new Utilisateur()
      this.utilisateur = new Utilisateur()
   }


  ngOnInit(): void {
    
  }

  controleInputs() {
    this.erreurConfirmationPassword = ""
    
    if(document.getElementById("confirmationPassword") != null){
      document.getElementById("confirmationPassword").classList.remove("border-erreur")
    }

    for (let key in this.erreurUtilisateur) {
      this.erreurUtilisateur[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true
    for (let key in this.erreurUtilisateur) {
      if (this.utilisateur[key] == "") {
        this.erreurUtilisateur[key] = "Veuillez remplir ce champ"
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        isValid = false
      }
    }

    if(this.confirmationPassword != this.utilisateur.password){
      this.erreurConfirmationPassword = "Veuillez verifier votre mot de passe."
      if(document.getElementById("confirmationPassword") != null){
        document.getElementById("confirmationPassword").classList.add("border-erreur")
      }
      isValid = false
    }

    if(this.utilisateur.email != ""){
      if(this.allUtilisateurs.filter(x => x.email == this.utilisateur.email).length > 0){
        this.erreurUtilisateur.email = "Cette email est déjà utilisée !!"
        isValid = false
        if(document.getElementById('email') != null){
          document.getElementById('email').classList.add("border-erreur")
        }
      
      }
    }

    return isValid
  }

  ajoutUtilisateur(){
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

    this.request.societe = this.informationGenerale.idSocieteCurrent

    this.isLoading = true

    this.apiUtilisateurService.newUser(this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutUtilisateur()
          this.notificationToast.showSuccess("Votre utilisateur est bien enregistrée !")
        }else{
          this.notificationToast.showError(res.message)
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  allUtilisateurs = []
  getAllParametres(){
    this.isLoading = true
    let request = {societe:this.informationGenerale.idSocieteCurrent}

    this.apiUtilisateurService.getAllParametres(request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.roles = resultat.roles
          this.allUtilisateurs = resultat.utilisateurs
          console.log(resultat)
          for (let item of this.allUtilisateurs) {
            if(item.email.lenth > 0)
            {
              this.allUtilisateurs.push(item.email)
            }
          }
          console.log(this.allUtilisateurs)
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
