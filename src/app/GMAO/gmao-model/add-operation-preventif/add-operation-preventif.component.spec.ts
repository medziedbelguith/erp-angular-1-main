import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationPreventifComponent } from './add-operation-preventif.component';

describe('AddOperationPreventifComponent', () => {
  let component: AddOperationPreventifComponent;
  let fixture: ComponentFixture<AddOperationPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperationPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperationPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
