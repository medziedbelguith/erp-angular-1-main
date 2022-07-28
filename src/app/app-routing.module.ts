import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { SuperAdminComponent } from './theme/layout/super-admin/super-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      },

    ]
  },

  {
    path: 'dashboard-admin',
    component: SuperAdminComponent,
    children: [
      {
        path: 'role/:id',
        loadChildren: () => import('./comerce/admin/role-admin/role-admin.module').then(module => module.RoleAdminModule)
      },
      {
        path: 'AjouterRole/:idSociete',
        loadChildren: () => import('./comerce/role/ajouter-role/ajouter-role.module').then(module => module.AjouterRoleModule)
      },
      {
        path: 'ModifierRole/:idSociete/:id',
        loadChildren: () => import('./comerce/role/modifier-role/modifier-role.module').then(module => module.ModifierRoleModule)
      },
      {
        path: 'AjouterSociete',
        loadChildren: () => import('./comerce/parametres/societe/ajout-societe/ajout-societe.module').then(module => module.AjoutSocieteModule)
      },
      {
        path: 'ModifierSociete/:id',
        loadChildren: () => import('./comerce/parametres/societe/modifier-societe/modifier-societe.module').then(module => module.ModifierSocieteModule)
      },
      {
        path: 'societe',
        loadChildren: () => import('./comerce/admin/societe-admin/societe-admin.module').then(module => module.SocieteAdminModule)
      },
      {
        path: 'utilisateur/:id',
        loadChildren: () => import('./comerce/admin/utilisateur-admin/utilisateur-admin.module').then(module => module.UtilisateurAdminModule)
      }
    ]
  },

  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'prixSpecifiques',
        loadChildren: () => import('./comerce/article/prix-specifique-article/prix-specifique-articl-input/prix-specifique-articl-input.module').then(module => module.PrixSpecifiqueArticlInputModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./comerce/client/client.module').then(module => module.ClientModule)
      },
      {
        path: 'fournisseur',
        loadChildren: () => import('./comerce/fournisseur/fournisseur.module').then(module => module.FournisseurModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./comerce/article/article.module').then(module => module.ArticleModule)
      },
      {
        path: 'transporteur',
        loadChildren: () => import('./comerce/transporteur/transporteur.module').then(module => module.TransporteurModule)
      },
      {
        path: 'parametre',
        loadChildren: () => import('./comerce/parametres/parametres.module').then(module => module.ParametresModule)
      },
      {
        path: 'variable',
        loadChildren: () => import('./comerce/variables/variables.module').then(module => module.VariablesModule)
      },
      {
        path: 'bonLivraison',
        loadChildren: () => import('./comerce/bonLivraison/bon-livrason.module').then(module => module.BonLivrasonModule)
      },
      {
        path: 'bonTransfert',
        loadChildren: () => import('./comerce/bonTransfert/bon-transfert.module').then(module => module.BonTransfertModule)
      },
      {
        path: 'bonAchat',
        loadChildren: () => import('./comerce/bonAchat/bonachat.module').then(module => module.BonachatModule)
      },
      {
        path: 'bonCommande',
        loadChildren: () => import('./comerce/bonCommande/boncommande.module').then(module => module.BoncommandeModule)
      },
      {
        path: 'bonRetourClient',
        loadChildren: () => import('./comerce/bonRetourClient/bonretourclient.module').then(module => module.BonretourclientModule)
      },
      {
        path: 'bonRetourFournisseur',
        loadChildren: () => import('./comerce/bonRetourFournisseur/bonretourfournisseur.module').then(module => module.BonretourfournisseurModule)
      },
      {
        path: 'commande',
        loadChildren: () => import('./comerce/commande/commande.module').then(module => module.CommandeModule)
      },
      {
        path: 'devis',
        loadChildren: () => import('./comerce/devis/devis.module').then(module => module.DevisModule)
      },
      {
        path: 'inventaire',
        loadChildren: () => import('./comerce/inventaire/inventaire.module').then(module => module.InventaireModule)
      },
      {
        path: 'reglement',
        loadChildren: () => import('./comerce/reglements/reglements.module').then(module => module.ReglementsModule)
      },
      {
        path: 'articlesVendu',
        loadChildren: () => import('./comerce/listArticlesVendu/list-articles-vendu/list-articles-vendu.module').then(module => module.ListArticlesVenduModule)

      },
      {
        path: 'secteur',
        loadChildren: () => import('./comerce/secteur/secteur.module').then(module => module.SecteurModule)
      },
      {
        path: 'correctionStock',
        loadChildren: () => import('./comerce/correctionStock/correction-stock.module').then(module => module.CorrectionStockModule)
      },
      {
        path: 'commandeTransfert/:id',
        loadChildren: () => import('./comerce/commande-convertion/commande-convertion.module').then(module => module.CommandeConvertionModule)
      },
      {
        path: 'bonAchatTransfert/:id',
        loadChildren: () => import('./comerce/bon-achat-convertion/bon-achat-convertion.module').then(module => module.BonAchatConvertionModule)
      },
      {
        path: 'bonLivraisonCommandeTransfert/:id',
        loadChildren: () => import('./comerce/bon-livraison-commande-convertion/bon-livraison-commande-convertion.module').then(module => module.BonLivraisonCommandeConvertionModule)
      },
      {
        path: 'bonLivraisonDevisTransfert/:id',
        loadChildren: () => import('./comerce/bon-livraison-devis-convertion/bon-livraison-devis-convertion.module').then(module => module.BonLivraisonDevisConvertionModule)
      },
      {
        path: 'bonRetourClientTransfert/:id',
        loadChildren: () => import('./comerce/bon-retour-client-convertion/bon-retour-client-convertion.module').then(module => module.BonRetourClientConvertionModule)
      },
      {
        path: 'bonRetourFournisseurTransfert/:id',
        loadChildren: () => import('./comerce/bon-retour-fournisseur-convertion/bon-retour-fournisseur-convertion.module').then(module => module.BonRetourFournisseurConvertionModule)
      },
      {
        path: 'releveClient',
        loadChildren: () => import('./comerce/releve-client/releve-client.module').then(module => module.ReleveClientModule)
      },
      {
        path: 'mouvementStock',
        loadChildren: () => import('./comerce/mouvement-stock/mouvement-stock.module').then(module => module.MouvementStockModule)
      },
      {

        path: 'reglementFournisseur',
        loadChildren: () => import('./comerce/reglementFournisseur/reglementfournisseur.module').then(module => module.ReglementfournisseurModule)
      },
      {
        path: 'ordreEmission',
        loadChildren: () => import('./comerce/ordreEmission/ordre-emission.module').then(module => module.OrdreEmissionModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./comerce/utilisateur/utilisateur.module').then(module => module.UtilisateurModule)
      },
      {
        path: 'personnel',
        loadChildren: () => import('./comerce/personnel/personnel.module').then(module => module.PersonnelModule)
      },
      {
        path: 'bonArticleCasse',
        loadChildren: () => import('./comerce/bonArticleCasse/bon-article-casse.module').then(module => module.BonArticleCasseModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./comerce/role/role.module').then(module => module.RoleModule)
      },
      {
        path: 'parametresPage',
        loadChildren: () => import('./parametres-page/parametres-page.module').then(module => module.ParametresPageModule)
      },


      {
        path: 'bonTravail',
        loadChildren: () => import('./comerce/bonTravail/bon-travail.module').then(module => module.BonTravailModule)
      },

      {
        path: 'bonPrelevement',
        loadChildren: () => import('./comerce/bonPrelevement/bon-prelevement.module').then(module => module.BonPrelevementModule)
      },
      {
        path: 'typeTier',
        loadChildren: () => import('./comerce/typeTier/type-tier.module').then(module => module.TypeTierModule)
      },
      {
        path: 'typeContact',
        loadChildren: () => import('./comerce/typeContact/type-contact.module').then(module => module.TypeContactModule)
      },
      {
        path: 'conditionReglement',
        loadChildren: () => import('./comerce/condition-reglement/condition-reglement.module').then(module => module.ConditionReglementModule)
      },
      {
        path: 'statuOpportunite',
        loadChildren: () => import('./comerce/statu-opportunite/statu-opportunite.module').then(module => module.StatuOpportuniteModule)
      },
      {
        path: 'projetInterne',
        loadChildren: () => import('./comerce/projetInterne/projet-interne.module').then(module => module.ProjetInterneModule)
      },
      {
        path: 'exercices',
        loadChildren: () => import('./comerce/exercices/exercices.module').then(module => module.ExercicesModule)
      },
      {
        path: 'tacheProjetInterne',
        loadChildren: () => import('./comerce/tacheProjetInterne/tache-projet-interne.module').then(module => module.TacheProjetInterneModule)
      },
      {
        path: 'typeCompte',
        loadChildren: () => import('./comerce/typeCompte/type-compte.module').then(module => module.TypeCompteModule)
      },
      {
        path: 'chargeDirecte',
        loadChildren: () => import('./comerce/charge-directe/charge-directe.module').then(module => module.ChargeDirecteModule)
      },
      {
        path: 'variantes',
        loadChildren: () => import('./comerce/variantes/variantes.module').then(module => module.VariantesModule)
      },

      {
        path: 'alert-stock',
        loadChildren: () => import('./comerce/article/alert-stock/alert-stock.module').then(module => module.AlertStockModule)
      },
      {
        path: 'releveClientDetaille',
        loadChildren: () => import('./comerce/releve-client-detaille/releve-client-detaille.module').then(module => module.ReleveClientDetailleModule)
      },
      {
        path: 'nomenclature',
        loadChildren: () => import('./comerce/nomenclature/nomenclature.module').then(module => module.NomenclatureModule)
      },

      {
        path: 'recepetion',
        loadChildren: () => import('./comerce/bonLivraison/receptions/receptions.module').then(module => module.ReceptionsModule)
      },

      {
        path: 'caisses',
        loadChildren: () => import('./comerce/caisse/caisse.module').then(module => module.CaisseModule)
      },
      {
        path: 'sessionCaisses',
        loadChildren: () => import('./comerce/session-caisse/session-caisse.module').then(module => module.SessionCaisseModule)
      },
      {
        path: 'chargesSociete',
        loadChildren: () => import('./comerce/charge-societe/charge-societe.module').then(module => module.ChargeSocieteModule)
      },
      /************************* Partie GMAO ****************************** */
      {
        path: 'gmao',
        loadChildren: () => import('./GMAO/gmao.module').then(module => module.GmaoModule)
      },


      /************************* Partie Comptabilite ****************************** */
      {
        path: 'comptabilite',
        loadChildren: () => import('./Comptabilite/comptabilite.module').then(module => module.ComptabiliteModule)
      },

    ]
  },

  {
    path: '**',
    redirectTo: 'authentication/page-inaccessible',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
