import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonRetourFournisseurComponent } from './ajout-bon-retour-fournisseur.component';

describe('AjoutBonRetourFournisseurComponent', () => {
  let component: AjoutBonRetourFournisseurComponent;
  let fixture: ComponentFixture<AjoutBonRetourFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonRetourFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonRetourFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
