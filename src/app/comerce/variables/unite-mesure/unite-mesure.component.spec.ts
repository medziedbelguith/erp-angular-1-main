import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteMesureComponent } from './unite-mesure.component';

describe('UniteMesureComponent', () => {
  let component: UniteMesureComponent;
  let fixture: ComponentFixture<UniteMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
