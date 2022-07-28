import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCaisseComponent } from './modifier-caisse.component';

describe('ModifierCaisseComponent', () => {
  let component: ModifierCaisseComponent;
  let fixture: ComponentFixture<ModifierCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
