import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';


@Component({
  selector: 'app-ajout-bon-travail',
  templateUrl: './ajout-bon-travail.component.html',
  styleUrls: ['./ajout-bon-travail.component.scss']
})
export class AjoutBonTravailComponent implements OnInit {

  constructor(
    public informationGenerale:InformationsService, 
    public fonctionPartagesService:FonctionPartagesService){
  }
  
  ngOnInit(): void {
  }
  
}
