import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSousFamillesComponent } from './ajout-sous-familles.component';

describe('AjoutSousFamillesComponent', () => {
  let component: AjoutSousFamillesComponent;
  let fixture: ComponentFixture<AjoutSousFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSousFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSousFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
