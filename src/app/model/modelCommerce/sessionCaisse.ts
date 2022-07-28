import { formatDate } from "@angular/common";

export class SessionCaisse {
    caisse = ""
    utilisateur = ""
    numero = ""
    dateOuverture = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    cloture = ""
    dateCloture = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    fondCaisseOuvrier = 0
    fondCaisseAdmin = 0
    totalCaisse = 0
    montantDifference = 0
    remarque = ""
    societe = ""
}
