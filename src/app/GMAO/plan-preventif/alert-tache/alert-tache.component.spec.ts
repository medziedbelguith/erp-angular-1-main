import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTacheComponent } from './alert-tache.component';

describe('AlertTacheComponent', () => {
  let component: AlertTacheComponent;
  let fixture: ComponentFixture<AlertTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
