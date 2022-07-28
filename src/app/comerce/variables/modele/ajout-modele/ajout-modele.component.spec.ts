import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModeleComponent } from './ajout-modele.component';

describe('AjoutModeleComponent', () => {
  let component: AjoutModeleComponent;
  let fixture: ComponentFixture<AjoutModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
