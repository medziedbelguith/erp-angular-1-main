import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPointageCompteurComponent } from './modifier-pointage-compteur.component';

describe('ModifierPointageCompteurComponent', () => {
  let component: ModifierPointageCompteurComponent;
  let fixture: ComponentFixture<ModifierPointageCompteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPointageCompteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPointageCompteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
