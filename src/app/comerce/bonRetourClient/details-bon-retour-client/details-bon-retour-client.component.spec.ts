import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonRetourClientComponent } from './details-bon-retour-client.component';

describe('DetailsBonRetourClientComponent', () => {
  let component: DetailsBonRetourClientComponent;
  let fixture: ComponentFixture<DetailsBonRetourClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonRetourClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonRetourClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
