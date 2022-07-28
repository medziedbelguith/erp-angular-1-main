import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonAchatComponent } from './details-bon-achat.component';

describe('DetailsBonAchatComponent', () => {
  let component: DetailsBonAchatComponent;
  let fixture: ComponentFixture<DetailsBonAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
