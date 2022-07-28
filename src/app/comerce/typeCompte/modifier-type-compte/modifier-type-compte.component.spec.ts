import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypeCompteComponent } from './modifier-type-compte.component';

describe('ModifierTypeCompteComponent', () => {
  let component: ModifierTypeCompteComponent;
  let fixture: ComponentFixture<ModifierTypeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTypeCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTypeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
