import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTacheProjetInterneComponent } from './list-tache-projet-interne.component';

describe('ListTacheProjetInterneComponent', () => {
  let component: ListTacheProjetInterneComponent;
  let fixture: ComponentFixture<ListTacheProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTacheProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTacheProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
