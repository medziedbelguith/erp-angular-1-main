import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechnicienComponent } from './list-technicien.component';

describe('ListTechnicienComponent', () => {
  let component: ListTechnicienComponent;
  let fixture: ComponentFixture<ListTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
