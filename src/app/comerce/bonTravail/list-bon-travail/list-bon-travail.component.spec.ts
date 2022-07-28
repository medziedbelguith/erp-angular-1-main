import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonTravailComponent } from './list-bon-travail.component';

describe('ListBonTravailComponent', () => {
  let component: ListBonTravailComponent;
  let fixture: ComponentFixture<ListBonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
