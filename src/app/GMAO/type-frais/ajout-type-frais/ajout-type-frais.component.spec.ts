import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeFraisComponent } from './ajout-type-frais.component';

describe('AjoutTypeFraisComponent', () => {
  let component: AjoutTypeFraisComponent;
  let fixture: ComponentFixture<AjoutTypeFraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
