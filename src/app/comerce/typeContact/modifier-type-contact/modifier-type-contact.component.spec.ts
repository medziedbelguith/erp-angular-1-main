import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypeContactComponent } from './modifier-type-contact.component';

describe('ModifierTypeContactComponent', () => {
  let component: ModifierTypeContactComponent;
  let fixture: ComponentFixture<ModifierTypeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTypeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTypeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
