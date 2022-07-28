import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonAchatComponent } from './modifier-bon-achat.component';

describe('ModifierBonAchatComponent', () => {
  let component: ModifierBonAchatComponent;
  let fixture: ComponentFixture<ModifierBonAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
