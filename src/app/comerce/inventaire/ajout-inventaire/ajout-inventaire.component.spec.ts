import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutInventaireComponent } from './ajout-inventaire.component';

describe('AjoutInventaireComponent', () => {
  let component: AjoutInventaireComponent;
  let fixture: ComponentFixture<AjoutInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
