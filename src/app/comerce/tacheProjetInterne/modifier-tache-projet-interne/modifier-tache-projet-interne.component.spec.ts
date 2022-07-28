import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTacheProjetInterneComponent } from './modifier-tache-projet-interne.component';

describe('ModifierTacheProjetInterneComponent', () => {
  let component: ModifierTacheProjetInterneComponent;
  let fixture: ComponentFixture<ModifierTacheProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTacheProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTacheProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
