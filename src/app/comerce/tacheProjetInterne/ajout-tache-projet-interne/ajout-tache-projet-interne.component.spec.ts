import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTacheProjetInterneComponent } from './ajout-tache-projet-interne.component';

describe('AjoutTacheProjetInterneComponent', () => {
  let component: AjoutTacheProjetInterneComponent;
  let fixture: ComponentFixture<AjoutTacheProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTacheProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTacheProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
