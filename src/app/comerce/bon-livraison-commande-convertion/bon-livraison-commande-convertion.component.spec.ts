import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivraisonCommandeConvertionComponent } from './bon-livraison-commande-convertion.component';

describe('BonLivraisonCommandeConvertionComponent', () => {
  let component: BonLivraisonCommandeConvertionComponent;
  let fixture: ComponentFixture<BonLivraisonCommandeConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivraisonCommandeConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivraisonCommandeConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
