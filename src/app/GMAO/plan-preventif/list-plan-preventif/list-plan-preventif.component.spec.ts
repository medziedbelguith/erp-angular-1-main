import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanPreventifComponent } from './list-plan-preventif.component';

describe('ListPlanPreventifComponent', () => {
  let component: ListPlanPreventifComponent;
  let fixture: ComponentFixture<ListPlanPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
