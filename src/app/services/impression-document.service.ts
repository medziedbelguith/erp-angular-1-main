import { Injectable } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { HttpClient } from '@angular/common/http';

import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ImpressionDocumentService {

  constructor(private fonctionPartagesService: FonctionPartagesService, private fonctionPartages: FonctionPartagesService, private http: HttpClient) {

  }

  isPrixVenteNotPrixAchat(titreDocument) {
    if (titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || titreDocument == this.fonctionPartagesService.titreDocuments.devis || titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      return true
    }
    return false
  }


  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  getHtmlClient(client, titreDocument) {
    if (client == null) {
      return ""
    }
    var chaine = ""
    if (this.isPrixVenteNotPrixAchat(titreDocument)) {
      chaine += `<p>Client:</p>`
    } else {
      chaine += `<p>Fournisseur:</p>`
    }
    chaine += `<p>Code:` + client.code + `</p>`
    chaine += `<p>Raison Sociale:` + client.raisonSociale + `</p>`
    chaine += `<p>M-Fiscale:` + client.matriculeFiscale + `</p>`
    chaine += `<p>Email:` + client.email + `</p>`
    chaine += `<p>Téléphone:` + client.telephone + `</p>`
    chaine += `<p>Adresse:` + client.adresseFacturation + `</p>`

    return ""
  }

  getHtmlDocument(document) {
    console.log(document)

    return ""
  }

  getHtmlArticle(articles) {

    var chaine = ""

    var tabKeys = {
      numero: "Numéro",
      reference: "Réference",
      designation: "Désignation",
      prixVenteHT: "Prix Vente HT",
      tauxRemise: "Taux_Rémise (%)",
      quantiteVente: "Quantité",
      prixVenteHTReel: "Prix Vente HT(Après remise)",
      unite1: "Unité",
      prixTTC: "P.U TTC",
      totalTTC: "Total TTC"
    }

    chaine += `<thead> <tr>`
    for (let key in tabKeys) {
      chaine += `<th>` + tabKeys[key] + `</th>`
    }
    chaine += `</tr> </thead> <tbody>`

    for (let i = 0; i < articles.length; i++) {
      chaine += `<tr>`
      for (let key in tabKeys) {
        chaine += `<td>` + articles[i][key] + `</td>`
      }
      chaine += `</tr>`
    }

    chaine += `</tbody>`
    return chaine
  }


  getDataToHtml2(titre, imageBase64, document, articles, client) {

    this.getHtmlClient(client, titre)
    this.getHtmlDocument(document)
    var articlesHTML = this.getHtmlArticle(articles)

    var chaine = ""

    chaine = `
    
    <html id="tablepdf" style="width:2480px; height:3508px; ">

<head>
    <meta charset="utf-8">


    <style>
        body {
            padding: 50px;
        }

        /* client */

        .client {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .client table {
            width: 1150px;
            height: 200px;
            text-align: center;
            font-size: 30px;
        }

        .client table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
        }

        /* client */

        /* article */

        .article table{
          margin-top: 100px;
          width: 100%;
          padding: 10px;
          border: 1px solid black;
          border-collapse: collapse;
        }

        .article th{
           background-color: rgb(167, 164, 164);
           padding: 10px;
           border: 1px solid black;
           border-collapse: collapse;
           vertical-align: bottom;
           font-size:25px;
        }

        .article td{
            border-top:none;
            border-bottom:none;
            vertical-align: top;
            font-size:25px;
        }
        /* article */
        
        /* footer */
        .footer table,th {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 25px;
        }

        .footer{
            margin-top: auto;
        }
        /* footer */

        /* total */
        .total table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 40px;
        }

        .total table{
           width: 600px;
           margin-left: auto;
        }

        .total{
            margin-top: 100px;
        }

        .total tr td:first-child{
           background-color: rgb(100, 98, 98);
        }
        /* total */

    </style>
</head>

<body style="padding:0px;">

    <div style="display: flex; flex-direction: column; padding:50px; width:2380px; height:3408px; ">

        <div class="client">
            <img src="`+ imageBase64 + `" style="width: 200px;">
            <h1>Facture N°: 589-555</h1>
        </div>
        <div class="client">

            <table>
                <tbody>
                    <tr>

                        <th>

                            Structure: How to Write Strong Paragraphs | Grammarly
                            Annonce·
                            https://www.grammarly.com/
                            From Grammar and Spelling To Style and Tone, Eliminate All Kinds Of Writing Mistakes. Write
                            Text That Is Not Just Grammatically Correct Writing, But Clear and Concise. AI Writing
                            Assistant. Improve Word Choice. Eliminate Grammar Errors. Fix Punctuation Errors.

                        </th>

                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>

                        <th>

                            Structure: How to Write Strong Paragraphs | Grammarly
                            Annonce·
                            https://www.grammarly.com/
                            From Grammar and Spelling To Style and Tone, Eliminate All Kinds Of Writing Mistakes. Write
                            Text That Is Not Just Grammatically Correct Writing, But Clear and Concise. AI Writing
                            Assistant. Improve Word Choice. Eliminate Grammar Errors. Fix Punctuation Errors.

                        </th>

                    </tr>
                </tbody>
            </table>


        </div>

        <div class="article">
            <table>
            `+articlesHTML+`
            </table>
        </div>

        <div class="total">

            <table>
                <tbody>
                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>
                </tbody>
             </table>

        </div>

        <div class="footer">
            <table>
                <tbody>
                    <tr>

                        <th>

                            Structure: How to Write Strong Paragraphs | Grammarly
                            Annonce·
                            https://www.grammarly.com/
                            From Grammar and Spelling To Style and Tone, Eliminate All Kinds Of Writing Mistakes. Write
                            Text That Is Not Just Grammatically Correct Writing, But Clear and Concise. AI Writing
                            Assistant. Improve Word Choice. Eliminate Grammar Errors. Fix Punctuation Errors.

                        </th>

                    </tr>
                </tbody>
            </table>
        </div>




    </div>


</body>

</html>
   
    `

    return chaine;
  }

  generatePDF(titre, bonLivraison, articles, client) {
    this.getBase64ImageFromUrl('http://localhost:5000/uploads/1644747915719loading.png')
      .then(imageBase64 => {
        this.telechargerPdf(titre, imageBase64, bonLivraison, articles, client)
      })
      .catch(err => console.error(err));
  }

  telechargerPdf(titre, imageBase64, bonLivraison, articles, client) {
    var newWindow = window.open();
    var chaine = this.getDataToHtml2(titre, imageBase64, bonLivraison, articles, client)
    newWindow.document.write(chaine);
    newWindow.open()

    setTimeout(() => {

      var data = newWindow.document.getElementById("tablepdf")

      html2canvas(data).then(canvas => {
        //newWindow.close()
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        window.open(contentDataURL);
        let pdf = new jspdf('p', 'mm', 'a4');
        var position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(titre + '.pdf');
      });

    }, 10)
  }

}
