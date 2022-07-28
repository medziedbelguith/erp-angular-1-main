import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChargeSocieteComponent } from './modifier-charge-societe.component';

describe('ModifierChargeSocieteComponent', () => {
  let component: ModifierChargeSocieteComponent;
  let fixture: ComponentFixture<ModifierChargeSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierChargeSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierChargeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
