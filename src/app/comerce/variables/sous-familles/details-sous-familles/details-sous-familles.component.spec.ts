import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSousFamillesComponent } from './details-sous-familles.component';

describe('DetailsSousFamillesComponent', () => {
  let component: DetailsSousFamillesComponent;
  let fixture: ComponentFixture<DetailsSousFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSousFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSousFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
