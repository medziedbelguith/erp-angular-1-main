import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonRetourFournisseurConvertionComponent } from './bon-retour-fournisseur-convertion.component';

describe('BonRetourFournisseurConvertionComponent', () => {
  let component: BonRetourFournisseurConvertionComponent;
  let fixture: ComponentFixture<BonRetourFournisseurConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonRetourFournisseurConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonRetourFournisseurConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
