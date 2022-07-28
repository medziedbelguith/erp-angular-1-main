import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSocieteComponent } from './details-societe.component';

describe('DetailsSocieteComponent', () => {
  let component: DetailsSocieteComponent;
  let fixture: ComponentFixture<DetailsSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
