import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModeleComponent } from './details-modele.component';

describe('DetailsModeleComponent', () => {
  let component: DetailsModeleComponent;
  let fixture: ComponentFixture<DetailsModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
