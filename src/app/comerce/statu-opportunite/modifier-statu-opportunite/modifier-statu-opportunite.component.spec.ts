import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierStatuOpportuniteComponent } from './modifier-statu-opportunite.component';

describe('ModifierStatuOpportuniteComponent', () => {
  let component: ModifierStatuOpportuniteComponent;
  let fixture: ComponentFixture<ModifierStatuOpportuniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierStatuOpportuniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierStatuOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
