import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonRetourFournisseurComponent } from './details-bon-retour-fournisseur.component';

describe('DetailsBonRetourFournisseurComponent', () => {
  let component: DetailsBonRetourFournisseurComponent;
  let fixture: ComponentFixture<DetailsBonRetourFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonRetourFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonRetourFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
