import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonCommandeComponent } from './details-bon-commande.component';

describe('DetailsBonCommandeComponent', () => {
  let component: DetailsBonCommandeComponent;
  let fixture: ComponentFixture<DetailsBonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
