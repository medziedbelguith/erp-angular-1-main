import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBTravailsComponent } from './ligne-btravails.component';

describe('LigneBTravailsComponent', () => {
  let component: LigneBTravailsComponent;
  let fixture: ComponentFixture<LigneBTravailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBTravailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBTravailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
