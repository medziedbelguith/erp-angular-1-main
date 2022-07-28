import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierModeleComponent } from './modifier-modele.component';

describe('ModifierModeleComponent', () => {
  let component: ModifierModeleComponent;
  let fixture: ComponentFixture<ModifierModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
