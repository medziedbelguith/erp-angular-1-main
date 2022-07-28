import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOrdreEmissionComponent } from './ajout-ordre-emission.component';

describe('AjoutOrdreEmissionComponent', () => {
  let component: AjoutOrdreEmissionComponent;
  let fixture: ComponentFixture<AjoutOrdreEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOrdreEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOrdreEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
