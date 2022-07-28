import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-ajout-bon-transfert',
  templateUrl: './ajout-bon-transfert.component.html',
  styleUrls: ['./ajout-bon-transfert.component.scss']
})
export class AjoutBonTransfertComponent implements OnInit {
  
  constructor(public informationGenerale:InformationsService, public fonctionPartagesService:FonctionPartagesService){
  }
  
  ngOnInit(): void {
  }
  
}
