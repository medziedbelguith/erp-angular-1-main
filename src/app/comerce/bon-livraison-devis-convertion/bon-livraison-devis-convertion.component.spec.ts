import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivraisonDevisConvertionComponent } from './bon-livraison-devis-convertion.component';

describe('BonLivraisonDevisConvertionComponent', () => {
  let component: BonLivraisonDevisConvertionComponent;
  let fixture: ComponentFixture<BonLivraisonDevisConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivraisonDevisConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivraisonDevisConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
