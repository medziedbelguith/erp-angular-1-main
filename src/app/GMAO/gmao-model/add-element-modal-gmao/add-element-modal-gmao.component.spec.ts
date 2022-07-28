import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElementModalGMAOComponent } from './add-element-modal-gmao.component';

describe('AddElementModalGMAOComponent', () => {
  let component: AddElementModalGMAOComponent;
  let fixture: ComponentFixture<AddElementModalGMAOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElementModalGMAOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElementModalGMAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
