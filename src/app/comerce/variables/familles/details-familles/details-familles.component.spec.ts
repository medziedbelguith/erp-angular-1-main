import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFamillesComponent } from './details-familles.component';

describe('DetailsFamillesComponent', () => {
  let component: DetailsFamillesComponent;
  let fixture: ComponentFixture<DetailsFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
