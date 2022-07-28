import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUniteMesureComponent } from './modifier-unite-mesure.component';

describe('ModifierUniteMesureComponent', () => {
  let component: ModifierUniteMesureComponent;
  let fixture: ComponentFixture<ModifierUniteMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierUniteMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierUniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
