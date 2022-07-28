import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPointageCompteurComponent } from './ajout-pointage-compteur.component';

describe('AjoutPointageCompteurComponent', () => {
  let component: AjoutPointageCompteurComponent;
  let fixture: ComponentFixture<AjoutPointageCompteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPointageCompteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPointageCompteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
