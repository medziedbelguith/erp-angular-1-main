import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTauxTvaComponent } from './modifier-taux-tva.component';

describe('ModifierTauxTvaComponent', () => {
  let component: ModifierTauxTvaComponent;
  let fixture: ComponentFixture<ModifierTauxTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTauxTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTauxTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
