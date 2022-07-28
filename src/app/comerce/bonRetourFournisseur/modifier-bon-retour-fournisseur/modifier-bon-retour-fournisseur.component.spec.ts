import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonRetourFournisseurComponent } from './modifier-bon-retour-fournisseur.component';

describe('ModifierBonRetourFournisseurComponent', () => {
  let component: ModifierBonRetourFournisseurComponent;
  let fixture: ComponentFixture<ModifierBonRetourFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonRetourFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonRetourFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
