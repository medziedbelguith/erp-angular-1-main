import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTauxTvaComponent } from './list-taux-tva.component';

describe('ListTauxTvaComponent', () => {
  let component: ListTauxTvaComponent;
  let fixture: ComponentFixture<ListTauxTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTauxTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTauxTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
