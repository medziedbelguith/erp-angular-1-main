import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierExerciceComponent } from './modifier-exercice.component';

describe('ModifierExerciceComponent', () => {
  let component: ModifierExerciceComponent;
  let fixture: ComponentFixture<ModifierExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
