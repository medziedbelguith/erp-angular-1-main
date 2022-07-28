import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSessionCaisseComponent } from './modifier-session-caisse.component';

describe('ModifierSessionCaisseComponent', () => {
  let component: ModifierSessionCaisseComponent;
  let fixture: ComponentFixture<ModifierSessionCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSessionCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSessionCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
