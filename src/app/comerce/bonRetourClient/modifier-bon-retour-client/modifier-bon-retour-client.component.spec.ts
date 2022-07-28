import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonRetourClientComponent } from './modifier-bon-retour-client.component';

describe('ModifierBonRetourClientComponent', () => {
  let component: ModifierBonRetourClientComponent;
  let fixture: ComponentFixture<ModifierBonRetourClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonRetourClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonRetourClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
