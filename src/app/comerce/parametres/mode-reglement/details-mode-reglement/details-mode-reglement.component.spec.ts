import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModeReglementComponent } from './details-mode-reglement.component';

describe('DetailsModeReglementComponent', () => {
  let component: DetailsModeReglementComponent;
  let fixture: ComponentFixture<DetailsModeReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsModeReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsModeReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
