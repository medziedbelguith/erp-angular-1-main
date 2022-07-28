import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStatuOpportuniteComponent } from './ajout-statu-opportunite.component';

describe('AjoutStatuOpportuniteComponent', () => {
  let component: AjoutStatuOpportuniteComponent;
  let fixture: ComponentFixture<AjoutStatuOpportuniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutStatuOpportuniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutStatuOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
