import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSousFamillesComponent } from './modifier-sous-familles.component';

describe('ModifierSousFamillesComponent', () => {
  let component: ModifierSousFamillesComponent;
  let fixture: ComponentFixture<ModifierSousFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSousFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSousFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
