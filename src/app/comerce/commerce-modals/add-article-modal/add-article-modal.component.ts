import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.scss']
})
export class AddArticleModalComponent implements OnInit {

  @Input() isOpenModalAjoutArticle = false

  @Input() isLoading = false

  @Input() idAjoutArticleModal
  
  @Input() params1AjoutArticle

  @Input() params2AjoutArticle

  classCss = "modalAjoutArticle"
 
  @Output() closeModalAjoutArticle = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }

  closeAjoutArticle(){
    this.closeModalAjoutArticle.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutArticle){
      this.classCss = "modalAjoutArticle modalAjoutArticle-open"
    }else{
      this.classCss = "modalAjoutArticle"
    }
  }

}