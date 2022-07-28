import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanPreventifComponent } from './details-plan-preventif.component';

describe('DetailsPlanPreventifComponent', () => {
  let component: DetailsPlanPreventifComponent;
  let fixture: ComponentFixture<DetailsPlanPreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlanPreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlanPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
