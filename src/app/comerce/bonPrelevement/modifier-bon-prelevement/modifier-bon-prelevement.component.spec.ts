import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonPrelevementComponent } from './modifier-bon-prelevement.component';

describe('ModifierBonPrelevementComponent', () => {
  let component: ModifierBonPrelevementComponent;
  let fixture: ComponentFixture<ModifierBonPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
