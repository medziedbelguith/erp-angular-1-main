import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-bon-transfert',
  templateUrl: './details-bon-transfert.component.html',
  styleUrls: ['./details-bon-transfert.component.scss']
})
export class DetailsBonTransfertComponent implements OnInit {
  constructor(private http: HttpClient,
    public fonctionPartagesService:FonctionPartagesService) {
  }

  
  ngOnInit(): void {
  
  }

  
}