import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieMachineComponent } from './categorie-machine.component';

describe('CategorieMachineComponent', () => {
  let component: CategorieMachineComponent;
  let fixture: ComponentFixture<CategorieMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
