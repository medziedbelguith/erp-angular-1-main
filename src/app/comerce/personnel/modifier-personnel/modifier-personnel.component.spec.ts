import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPersonnelComponent } from './modifier-personnel.component';

describe('ModifierPersonnelComponent', () => {
  let component: ModifierPersonnelComponent;
  let fixture: ComponentFixture<ModifierPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
