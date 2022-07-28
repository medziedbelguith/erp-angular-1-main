import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonCommandeComponent } from './ajout-bon-commande.component';

describe('AjoutBonCommandeComponent', () => {
  let component: AjoutBonCommandeComponent;
  let fixture: ComponentFixture<AjoutBonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
