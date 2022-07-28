import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuOpportuniteComponent } from './statu-opportunite.component';

describe('StatuOpportuniteComponent', () => {
  let component: StatuOpportuniteComponent;
  let fixture: ComponentFixture<StatuOpportuniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatuOpportuniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
