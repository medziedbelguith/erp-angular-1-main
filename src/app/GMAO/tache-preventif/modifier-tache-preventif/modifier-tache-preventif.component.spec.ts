import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTachePreventifComponent } from './modifier-tache-preventif.component';

describe('ModifierTachePreventifComponent', () => {
  let component: ModifierTachePreventifComponent;
  let fixture: ComponentFixture<ModifierTachePreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTachePreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTachePreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
