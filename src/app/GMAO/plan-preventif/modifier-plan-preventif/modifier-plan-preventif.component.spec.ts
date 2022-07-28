import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPlanPreventifComponent } from './modifier-plan-preventif.component';

describe('ModifierPlanPreventifComponent', () => {
  let component: ModifierPlanPreventifComponent;
  let fixture: ComponentFixture<ModifierPlanPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPlanPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPlanPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
