import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOrdreEmissionComponent } from './modifier-ordre-emission.component';

describe('ModifierOrdreEmissionComponent', () => {
  let component: ModifierOrdreEmissionComponent;
  let fixture: ComponentFixture<ModifierOrdreEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierOrdreEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierOrdreEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
