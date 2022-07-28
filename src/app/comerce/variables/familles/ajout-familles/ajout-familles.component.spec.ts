import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFamillesComponent } from './ajout-familles.component';

describe('AjoutFamillesComponent', () => {
  let component: AjoutFamillesComponent;
  let fixture: ComponentFixture<AjoutFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
