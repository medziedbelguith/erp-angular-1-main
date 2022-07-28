import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypeTierComponent } from './modifier-type-tier.component';

describe('ModifierTypeTierComponent', () => {
  let component: ModifierTypeTierComponent;
  let fixture: ComponentFixture<ModifierTypeTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTypeTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTypeTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
