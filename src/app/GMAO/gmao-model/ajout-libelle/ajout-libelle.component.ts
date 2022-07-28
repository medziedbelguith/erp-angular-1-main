import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-libelle',
  templateUrl: './ajout-libelle.component.html',
  styleUrls: ['./ajout-libelle.component.scss']
})
export class AjoutLibelleComponent implements OnInit {

  @Input() isLoading = false
  
  constructor() { }

  ngOnInit(): void {
  }

}
