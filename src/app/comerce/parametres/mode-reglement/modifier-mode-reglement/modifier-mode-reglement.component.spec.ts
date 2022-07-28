import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierModeReglementComponent } from './modifier-mode-reglement.component';

describe('ModifierModeReglementComponent', () => {
  let component: ModifierModeReglementComponent;
  let fixture: ComponentFixture<ModifierModeReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierModeReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierModeReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
