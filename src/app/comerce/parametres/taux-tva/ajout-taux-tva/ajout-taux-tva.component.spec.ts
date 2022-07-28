import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTauxTvaComponent } from './ajout-taux-tva.component';

describe('AjoutTauxTvaComponent', () => {
  let component: AjoutTauxTvaComponent;
  let fixture: ComponentFixture<AjoutTauxTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTauxTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTauxTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
