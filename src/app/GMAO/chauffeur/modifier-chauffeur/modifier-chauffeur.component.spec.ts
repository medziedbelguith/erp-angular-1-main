import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChauffeurComponent } from './modifier-chauffeur.component';

describe('ModifierChauffeurComponent', () => {
  let component: ModifierChauffeurComponent;
  let fixture: ComponentFixture<ModifierChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
