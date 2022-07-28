import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueMachineComponent } from './marque-machine.component';

describe('MarqueMachineComponent', () => {
  let component: MarqueMachineComponent;
  let fixture: ComponentFixture<MarqueMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
