import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTauxTvaComponent } from './details-taux-tva.component';

describe('DetailsTauxTvaComponent', () => {
  let component: DetailsTauxTvaComponent;
  let fixture: ComponentFixture<DetailsTauxTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTauxTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTauxTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
