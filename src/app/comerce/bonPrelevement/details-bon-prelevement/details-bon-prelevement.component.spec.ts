import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonPrelevementComponent } from './details-bon-prelevement.component';

describe('DetailsBonPrelevementComponent', () => {
  let component: DetailsBonPrelevementComponent;
  let fixture: ComponentFixture<DetailsBonPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
