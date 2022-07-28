import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonTravailComponent } from './details-bon-travail.component';

describe('DetailsBonTravailComponent', () => {
  let component: DetailsBonTravailComponent;
  let fixture: ComponentFixture<DetailsBonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
