import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChargeDirecteComponent } from './list-charge-directe.component';

describe('ListChargeDirecteComponent', () => {
  let component: ListChargeDirecteComponent;
  let fixture: ComponentFixture<ListChargeDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChargeDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChargeDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
