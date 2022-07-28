import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutUniteMesureComponent } from './ajout-unite-mesure.component';

describe('AjoutUniteMesureComponent', () => {
  let component: AjoutUniteMesureComponent;
  let fixture: ComponentFixture<AjoutUniteMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutUniteMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutUniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
