import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChargeDirecteComponent } from './ajout-charge-directe.component';

describe('AjoutChargeDirecteComponent', () => {
  let component: AjoutChargeDirecteComponent;
  let fixture: ComponentFixture<AjoutChargeDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutChargeDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChargeDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
