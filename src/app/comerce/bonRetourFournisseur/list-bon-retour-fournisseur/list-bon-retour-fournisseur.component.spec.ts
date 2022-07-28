import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonRetourFournisseurComponent } from './list-bon-retour-fournisseur.component';

describe('ListBonRetourFournisseurComponent', () => {
  let component: ListBonRetourFournisseurComponent;
  let fixture: ComponentFixture<ListBonRetourFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonRetourFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonRetourFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
