import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonPrelevementComponent } from './list-bon-prelevement.component';

describe('ListBonPrelevementComponent', () => {
  let component: ListBonPrelevementComponent;
  let fixture: ComponentFixture<ListBonPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
