import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonArticleCasseComponent } from './ajout-bon-article-casse.component';

describe('AjoutBonArticleCasseComponent', () => {
  let component: AjoutBonArticleCasseComponent;
  let fixture: ComponentFixture<AjoutBonArticleCasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonArticleCasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonArticleCasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
