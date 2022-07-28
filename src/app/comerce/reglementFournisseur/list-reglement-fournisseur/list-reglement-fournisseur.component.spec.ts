import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReglementFournisseurComponent } from './list-reglement-fournisseur.component';

describe('ListReglementFournisseurComponent', () => {
  let component: ListReglementFournisseurComponent;
  let fixture: ComponentFixture<ListReglementFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReglementFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
