import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonTransfertComponent } from './modifier-bon-transfert.component';

describe('ModifierBonTransfertComponent', () => {
  let component: ModifierBonTransfertComponent;
  let fixture: ComponentFixture<ModifierBonTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
