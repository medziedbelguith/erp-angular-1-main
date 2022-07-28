import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLibelleComponent } from './ajout-libelle.component';

describe('AjoutLibelleComponent', () => {
  let component: AjoutLibelleComponent;
  let fixture: ComponentFixture<AjoutLibelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutLibelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutLibelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
