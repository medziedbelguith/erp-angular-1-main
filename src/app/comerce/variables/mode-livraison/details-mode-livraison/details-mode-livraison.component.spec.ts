import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModeLivraisonComponent } from './details-mode-livraison.component';

describe('DetailsModeLivraisonComponent', () => {
  let component: DetailsModeLivraisonComponent;
  let fixture: ComponentFixture<DetailsModeLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsModeLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsModeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
