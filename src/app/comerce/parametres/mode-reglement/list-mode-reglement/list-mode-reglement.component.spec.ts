import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeReglementComponent } from './list-mode-reglement.component';

describe('ListModeReglementComponent', () => {
  let component: ListModeReglementComponent;
  let fixture: ComponentFixture<ListModeReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModeReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModeReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
