import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionReglementComponent } from './condition-reglement.component';

describe('ConditionReglementComponent', () => {
  let component: ConditionReglementComponent;
  let fixture: ComponentFixture<ConditionReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
