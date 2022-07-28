import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProjetInterneComponent } from './ajout-projet-interne.component';

describe('AjoutProjetInterneComponent', () => {
  let component: AjoutProjetInterneComponent;
  let fixture: ComponentFixture<AjoutProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
