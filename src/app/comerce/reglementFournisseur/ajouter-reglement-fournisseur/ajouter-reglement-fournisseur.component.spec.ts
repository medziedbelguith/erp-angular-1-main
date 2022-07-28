import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReglementFournisseurComponent } from './ajouter-reglement-fournisseur.component';

describe('AjouterReglementFournisseurComponent', () => {
  let component: AjouterReglementFournisseurComponent;
  let fixture: ComponentFixture<AjouterReglementFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterReglementFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
