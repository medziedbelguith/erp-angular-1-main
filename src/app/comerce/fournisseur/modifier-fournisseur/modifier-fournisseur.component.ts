import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';


@Component({
  selector: 'app-modifier-fournisseur',
  templateUrl: './modifier-fournisseur.component.html',
  styleUrls: ['./modifier-fournisseur.component.scss']
})
export class ModifierFournisseurComponent implements OnInit {
 
  constructor(){}

  ngOnInit(): void {
      console.log(this.id)
  }

  @Input() id = ""

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  closeModalFunction(){
    this.closeModal.emit();
  }
}
