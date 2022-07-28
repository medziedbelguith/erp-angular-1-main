import { Component, OnInit } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-modifier-correction-stock',
  templateUrl: './modifier-correction-stock.component.html',
  styleUrls: ['./modifier-correction-stock.component.scss']
})
export class ModifierCorrectionStockComponent implements OnInit {

  constructor(public fonctionsPartages:FonctionPartagesService) {
    
  }

 
  ngOnInit(): void {
  }

}
