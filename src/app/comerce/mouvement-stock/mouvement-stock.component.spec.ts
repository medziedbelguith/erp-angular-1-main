import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementStockComponent } from './mouvement-stock.component';

describe('MouvementStockComponent', () => {
  let component: MouvementStockComponent;
  let fixture: ComponentFixture<MouvementStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
