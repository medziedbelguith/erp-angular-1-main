import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-modifier-bon-travail',
  templateUrl: './modifier-bon-travail.component.html',
  styleUrls: ['./modifier-bon-travail.component.scss']
})
export class ModifierBonTravailComponent implements OnInit {
  
  constructor(public informationGenerale:InformationsService, public fonctionPartagesService:FonctionPartagesService){
  }

  
  ngOnInit(): void {
  
  }

  
}
