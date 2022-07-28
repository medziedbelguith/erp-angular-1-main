import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEcheanceFournisseurComponent } from './list-echeance-fournisseur.component';

describe('ListEcheanceFournisseurComponent', () => {
  let component: ListEcheanceFournisseurComponent;
  let fixture: ComponentFixture<ListEcheanceFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEcheanceFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEcheanceFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
