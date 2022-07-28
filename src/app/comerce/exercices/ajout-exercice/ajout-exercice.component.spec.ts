import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutExerciceComponent } from './ajout-exercice.component';

describe('AjoutExerciceComponent', () => {
  let component: AjoutExerciceComponent;
  let fixture: ComponentFixture<AjoutExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
