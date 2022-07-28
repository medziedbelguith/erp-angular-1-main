import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFraisComponent } from './modifier-frais.component';

describe('ModifierFraisComponent', () => {
  let component: ModifierFraisComponent;
  let fixture: ComponentFixture<ModifierFraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
