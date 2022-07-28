import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTacheProjetInterneComponent } from './details-tache-projet-interne.component';

describe('DetailsTacheProjetInterneComponent', () => {
  let component: DetailsTacheProjetInterneComponent;
  let fixture: ComponentFixture<DetailsTacheProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTacheProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTacheProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
