import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjetInterneComponent } from './details-projet-interne.component';

describe('DetailsProjetInterneComponent', () => {
  let component: DetailsProjetInterneComponent;
  let fixture: ComponentFixture<DetailsProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
