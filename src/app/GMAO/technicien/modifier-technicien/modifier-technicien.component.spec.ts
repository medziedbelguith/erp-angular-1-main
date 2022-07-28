import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTechnicienComponent } from './modifier-technicien.component';

describe('ModifierTechnicienComponent', () => {
  let component: ModifierTechnicienComponent;
  let fixture: ComponentFixture<ModifierTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
