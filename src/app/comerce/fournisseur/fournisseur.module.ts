import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurRoutingModule } from './fournisseur-routing.module';


import { AutocompleteModule } from 'src/app/shared-global/autocomplete/autocomplete.module';
import { AjouterFournisseurComponent } from './ajouter-fournisseur/ajouter-fournisseur.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
  ]
})
export class FournisseurModule { }
