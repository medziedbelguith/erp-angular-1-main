import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonTransfertComponent } from './details-bon-transfert.component';

describe('DetailsBonTransfertComponent', () => {
  let component: DetailsBonTransfertComponent;
  let fixture: ComponentFixture<DetailsBonTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
