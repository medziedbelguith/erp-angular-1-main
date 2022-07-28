import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPersonnelComponent } from './details-personnel.component';

describe('DetailsPersonnelComponent', () => {
  let component: DetailsPersonnelComponent;
  let fixture: ComponentFixture<DetailsPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
