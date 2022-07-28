import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-add-element-modal-gmao',
  templateUrl: './add-element-modal-gmao.component.html',
  styleUrls: ['./add-element-modal-gmao.component.scss']
})
export class AddElementModalGMAOComponent implements OnInit {

  @Input() isOpenModalAjoutElement = false

  @Input() isLoading = false

  @Input() idAjoutElementModal
  
  @Input() params1AjoutElement

  @Input() params2AjoutElement

  @Input() isPopup = false

  classCss = "modalAjoutElement"

  @Input() typeElement = ""
  
  @Output() closeModalAjoutElement = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient,
    public fonctionPartagesService:FonctionPartagesService){ 
      
  }

  closeAjoutElement(){
    this.closeModalAjoutElement.emit();
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutElement){
      this.classCss = "modalAjoutElement modalAjoutElement-open"
    }else{
      this.classCss = "modalAjoutElement"
    }
  }

}
