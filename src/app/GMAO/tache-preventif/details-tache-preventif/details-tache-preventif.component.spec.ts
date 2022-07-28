import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTachePreventifComponent } from './details-tache-preventif.component';

describe('DetailsTachePreventifComponent', () => {
  let component: DetailsTachePreventifComponent;
  let fixture: ComponentFixture<DetailsTachePreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTachePreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTachePreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
