import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDevisComponent } from './modifier-devis.component';

describe('ModifierDevisComponent', () => {
  let component: ModifierDevisComponent;
  let fixture: ComponentFixture<ModifierDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
