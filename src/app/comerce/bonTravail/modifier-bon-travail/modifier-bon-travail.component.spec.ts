import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonTravailComponent } from './modifier-bon-travail.component';

describe('ModifierBonTravailComponent', () => {
  let component: ModifierBonTravailComponent;
  let fixture: ComponentFixture<ModifierBonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
