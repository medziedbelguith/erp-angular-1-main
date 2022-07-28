import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTransporteurComponent } from './modifier-transporteur.component';

describe('ModifierTransporteurComponent', () => {
  let component: ModifierTransporteurComponent;
  let fixture: ComponentFixture<ModifierTransporteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTransporteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
