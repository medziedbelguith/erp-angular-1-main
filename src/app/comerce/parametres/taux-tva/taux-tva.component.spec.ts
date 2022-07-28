import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxTVAComponent } from './taux-tva.component';

describe('TauxTVAComponent', () => {
  let component: TauxTVAComponent;
  let fixture: ComponentFixture<TauxTVAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxTVAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxTVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
