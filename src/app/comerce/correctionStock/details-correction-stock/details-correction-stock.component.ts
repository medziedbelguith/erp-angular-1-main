import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-correction-stock',
  templateUrl: './details-correction-stock.component.html',
  styleUrls: ['./details-correction-stock.component.scss']
})
export class DetailsCorrectionStockComponent implements OnInit {
  constructor(public fonctionsPartages:FonctionPartagesService) {
    
  }

 
  ngOnInit(): void {
  }

}