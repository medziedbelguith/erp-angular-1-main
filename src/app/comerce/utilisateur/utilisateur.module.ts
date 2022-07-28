import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { AjoutUtilisateurComponent } from './Components/ajout-utilisateur/ajout-utilisateur.component';
import { DetailsUtilisateurComponent } from './Components/details-utilisateur/details-utilisateur.component';
import { ListUtilisateurComponent } from './Components/list-utilisateur/list-utilisateur.component';
import { ModifierUtilisateurComponent } from './Components/modifier-utilisateur/modifier-utilisateur.component';
import { ShowelementsComponent } from 'src/app/shared-global/showelements/showelements.component';
import { Spinner2Component } from 'src/app/shared-global/spinner2/spinner2.component';
import { PaginationComponent } from 'src/app/shared-global/pagination/pagination.component';
import { DeleteModalComponent } from 'src/app/shared-global/delete-modal/delete-modal.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    SharedModule
  ]
})
export class UtilisateurModule { }
