import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTechnicienComponent } from './details-technicien.component';

describe('DetailsTechnicienComponent', () => {
  let component: DetailsTechnicienComponent;
  let fixture: ComponentFixture<DetailsTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
