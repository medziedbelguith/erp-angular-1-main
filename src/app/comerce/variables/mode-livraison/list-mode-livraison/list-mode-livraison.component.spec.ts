import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeLivraisonComponent } from './list-mode-livraison.component';

describe('ListModeLivraisonComponent', () => {
  let component: ListModeLivraisonComponent;
  let fixture: ComponentFixture<ListModeLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModeLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
