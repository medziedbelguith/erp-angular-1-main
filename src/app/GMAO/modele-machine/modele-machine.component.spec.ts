import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleMachineComponent } from './modele-machine.component';

describe('ModeleMachineComponent', () => {
  let component: ModeleMachineComponent;
  let fixture: ComponentFixture<ModeleMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeleMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeleMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
