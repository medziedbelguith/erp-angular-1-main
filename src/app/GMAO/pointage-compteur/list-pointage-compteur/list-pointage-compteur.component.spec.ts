import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointageCompteurComponent } from './list-pointage-compteur.component';

describe('ListPointageCompteurComponent', () => {
  let component: ListPointageCompteurComponent;
  let fixture: ComponentFixture<ListPointageCompteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPointageCompteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPointageCompteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
