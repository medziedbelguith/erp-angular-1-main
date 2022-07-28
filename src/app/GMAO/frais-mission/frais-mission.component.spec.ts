import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisMissionComponent } from './frais-mission.component';

describe('FraisMissionComponent', () => {
  let component: FraisMissionComponent;
  let fixture: ComponentFixture<FraisMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraisMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
