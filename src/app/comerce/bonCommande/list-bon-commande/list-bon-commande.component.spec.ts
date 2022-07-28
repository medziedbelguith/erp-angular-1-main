import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonCommandeComponent } from './list-bon-commande.component';

describe('ListBonCommandeComponent', () => {
  let component: ListBonCommandeComponent;
  let fixture: ComponentFixture<ListBonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
