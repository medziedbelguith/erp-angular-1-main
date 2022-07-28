import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationPreventifComponent } from './operation-preventif.component';

describe('OperationPreventifComponent', () => {
  let component: OperationPreventifComponent;
  let fixture: ComponentFixture<OperationPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
