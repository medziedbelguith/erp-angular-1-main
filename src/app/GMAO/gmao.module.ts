import { AjoutChauffeurModule } from './chauffeur/ajout-chauffeur/ajout-chauffeur.module';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { ListTypeFraisComponent } from './type-frais/list-type-frais/list-type-frais.component';
import { AjoutTypeFraisComponent } from './type-frais/ajout-type-frais/ajout-type-frais.component';
import { AjoutMissionComponent } from './missions/ajout-mission/ajout-mission.component';
import { ListMissionComponent } from './missions/list-mission/list-mission.component';
import { DetailsTachePreventifComponent } from './tache-preventif/details-tache-preventif/details-tache-preventif.component';
import { ListTachePreventifComponent } from './tache-preventif/list-tache-preventif/list-tache-preventif.component';
import { ModifierTachePreventifComponent } from './tache-preventif/modifier-tache-preventif/modifier-tache-preventif.component';
import { AjoutTachePreventifComponent } from './tache-preventif/ajout-tache-preventif/ajout-tache-preventif.component';
import { EnergieComponent } from './energie/energie.component';
import { GmaoRoutingModule } from './gmao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieMachineComponent } from './categorie-machine/categorie-machine.component';
import { MarqueMachineComponent } from './marque-machine/marque-machine.component';
import { ModeleMachineComponent } from './modele-machine/modele-machine.component';
import { OperationPreventifComponent } from './operation-preventif/operation-preventif.component';
import { AjoutPlanPreventifComponent } from './plan-preventif/ajout-plan-preventif/ajout-plan-preventif.component';
import { DetailsPlanPreventifComponent } from './plan-preventif/details-plan-preventif/details-plan-preventif.component';
import { ListPlanPreventifComponent } from './plan-preventif/list-plan-preventif/list-plan-preventif.component';
import { ModifierPlanPreventifComponent } from './plan-preventif/modifier-plan-preventif/modifier-plan-preventif.component';
import { SharedGlobalModule } from '../shared-global/shared-global.module';
import { SharedModule } from '../theme/shared/shared.module';
import { MachineComponent } from './machine/machine.component';
import { PeriodiciteComponent } from './periodicite/periodicite.component';
import { AddElementModalGMAOComponent } from './gmao-model/add-element-modal-gmao/add-element-modal-gmao.component';
import { AjoutPersonnelModule } from '../comerce/personnel/ajout-personnel/ajout-personnel.module';
import { EtatTacheComponent } from './etat-tache/etat-tache.component';
import { EtatCarburantComponent } from './etat-carburant/etat-carburant.component';
import { AjoutTechnicienComponent } from './technicien/ajout-technicien/ajout-technicien.component';
import { ListTechnicienComponent } from './technicien/list-technicien/list-technicien.component';
import { ModifierTechnicienComponent } from './technicien/modifier-technicien/modifier-technicien.component';
import { DetailsTechnicienComponent } from './technicien/details-technicien/details-technicien.component';
import { FraisMissionComponent } from './frais-mission/frais-mission.component';
import { AjoutLibelleComponent } from './gmao-model/ajout-libelle/ajout-libelle.component';
import { ModifierChauffeurComponent } from './chauffeur/modifier-chauffeur/modifier-chauffeur.component';
import { ListChauffeurComponent } from './chauffeur/list-chauffeur/list-chauffeur.component';
import { ListPointageCompteurComponent } from './pointage-compteur/list-pointage-compteur/list-pointage-compteur.component';
import { ModifierPointageCompteurComponent } from './pointage-compteur/modifier-pointage-compteur/modifier-pointage-compteur.component';
import { AjoutPointageCompteurComponent } from './pointage-compteur/ajout-pointage-compteur/ajout-pointage-compteur.component';
import { AlertTacheComponent } from './plan-preventif/alert-tache/alert-tache.component';


@NgModule({
  declarations: [
    CategorieMachineComponent,
    EnergieComponent,
    MarqueMachineComponent,
    ModeleMachineComponent,
    OperationPreventifComponent,
    AjoutPlanPreventifComponent,
    DetailsPlanPreventifComponent,
    ListPlanPreventifComponent,
    ModifierPlanPreventifComponent,
    MachineComponent,
    PeriodiciteComponent,
    AjoutTachePreventifComponent,
    ModifierTachePreventifComponent,
    ListTachePreventifComponent,
    DetailsTachePreventifComponent,
    AddElementModalGMAOComponent,
    EtatTacheComponent,
    EtatCarburantComponent,
    AjoutTechnicienComponent,
    ListTechnicienComponent,
    ModifierTechnicienComponent,
    DetailsTechnicienComponent,
    FraisMissionComponent,
    AjoutLibelleComponent,
    ListMissionComponent,
    AjoutMissionComponent,
    AjoutTypeFraisComponent,
    ListTypeFraisComponent,
    VehiculeComponent,
    ModifierChauffeurComponent,
    ListChauffeurComponent,
    ListPointageCompteurComponent,
    ModifierPointageCompteurComponent,
    AjoutPointageCompteurComponent,
    AlertTacheComponent,
  ],
  imports: [
    CommonModule,
    GmaoRoutingModule,
    SharedGlobalModule,
    SharedModule,
    AjoutPersonnelModule,
    AjoutChauffeurModule,
  ],
  exports: [
    CategorieMachineComponent,
    EnergieComponent,
    MarqueMachineComponent,
    ModeleMachineComponent,
    OperationPreventifComponent,
    AjoutPlanPreventifComponent,
    DetailsPlanPreventifComponent,
    ListPlanPreventifComponent,
    ModifierPlanPreventifComponent,
    MachineComponent,
    PeriodiciteComponent,
    AjoutTachePreventifComponent,
    ModifierTachePreventifComponent,
    ListTachePreventifComponent,
    DetailsTachePreventifComponent,
    AddElementModalGMAOComponent,
    EtatTacheComponent,
    EtatCarburantComponent,
    AjoutTechnicienComponent,
    ListTechnicienComponent,
    ModifierTechnicienComponent,
    DetailsTechnicienComponent,
    FraisMissionComponent,
    AjoutTypeFraisComponent,
    ListTypeFraisComponent,
    VehiculeComponent,
    ModifierChauffeurComponent,
    ListChauffeurComponent,
    ListPointageCompteurComponent,
    ModifierPointageCompteurComponent,
    AjoutPointageCompteurComponent

  ]
})
export class GmaoModule { }