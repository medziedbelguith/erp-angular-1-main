import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeModeReglComponent } from './charge-mode-regl.component';

describe('ChargeModeReglComponent', () => {
  let component: ChargeModeReglComponent;
  let fixture: ComponentFixture<ChargeModeReglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeModeReglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeModeReglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
