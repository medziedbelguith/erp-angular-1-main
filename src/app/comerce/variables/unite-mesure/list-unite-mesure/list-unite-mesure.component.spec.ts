import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUniteMesureComponent } from './list-unite-mesure.component';

describe('ListUniteMesureComponent', () => {
  let component: ListUniteMesureComponent;
  let fixture: ComponentFixture<ListUniteMesureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUniteMesureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUniteMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
