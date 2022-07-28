import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPlanPreventifComponent } from './ajout-plan-preventif.component';

describe('AjoutPlanPreventifComponent', () => {
  let component: AjoutPlanPreventifComponent;
  let fixture: ComponentFixture<AjoutPlanPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPlanPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPlanPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
