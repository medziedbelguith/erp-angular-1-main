import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-bon-travail',
  templateUrl: './details-bon-travail.component.html',
  styleUrls: ['./details-bon-travail.component.scss']
})
export class DetailsBonTravailComponent implements OnInit {
  constructor(private http: HttpClient,
    public fonctionPartagesService:FonctionPartagesService) {
  }

  
  ngOnInit(): void {
  
  }

  
}