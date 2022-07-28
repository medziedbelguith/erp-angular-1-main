import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReglementFournisseurComponent } from './modifier-reglement-fournisseur.component';

describe('ModifierReglementFournisseurComponent', () => {
  let component: ModifierReglementFournisseurComponent;
  let fixture: ComponentFixture<ModifierReglementFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierReglementFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
