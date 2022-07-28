import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModeLivraisonComponent } from './ajout-mode-livraison.component';

describe('AjoutModeLivraisonComponent', () => {
  let component: AjoutModeLivraisonComponent;
  let fixture: ComponentFixture<AjoutModeLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModeLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
