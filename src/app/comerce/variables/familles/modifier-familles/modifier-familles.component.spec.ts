import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFamillesComponent } from './modifier-familles.component';

describe('ModifierFamillesComponent', () => {
  let component: ModifierFamillesComponent;
  let fixture: ComponentFixture<ModifierFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
