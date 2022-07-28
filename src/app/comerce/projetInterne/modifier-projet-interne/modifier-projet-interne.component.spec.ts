import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProjetInterneComponent } from './modifier-projet-interne.component';

describe('ModifierProjetInterneComponent', () => {
  let component: ModifierProjetInterneComponent;
  let fixture: ComponentFixture<ModifierProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
