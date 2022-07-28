import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUniteMesureComponent } from './details-unite-mesure.component';

describe('DetailsUniteMesureComponent', () => {
  let component: DetailsUniteMesureComponent;
  let fixture: ComponentFixture<DetailsUniteMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUniteMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
