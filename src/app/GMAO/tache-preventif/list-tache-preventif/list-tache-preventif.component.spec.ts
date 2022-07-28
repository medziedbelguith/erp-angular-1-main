import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTachePreventifComponent } from './list-tache-preventif.component';

describe('ListTachePreventifComponent', () => {
  let component: ListTachePreventifComponent;
  let fixture: ComponentFixture<ListTachePreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTachePreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTachePreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
