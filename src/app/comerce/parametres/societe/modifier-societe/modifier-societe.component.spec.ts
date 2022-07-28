import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSocieteComponent } from './modifier-societe.component';

describe('ModifierSocieteComponent', () => {
  let component: ModifierSocieteComponent;
  let fixture: ComponentFixture<ModifierSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
