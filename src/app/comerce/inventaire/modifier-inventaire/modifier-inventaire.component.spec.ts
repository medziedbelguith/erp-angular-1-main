import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInventaireComponent } from './modifier-inventaire.component';

describe('ModifierInventaireComponent', () => {
  let component: ModifierInventaireComponent;
  let fixture: ComponentFixture<ModifierInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
