import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonTransfertComponent } from './list-bon-transfert.component';

describe('ListBonTransfertComponent', () => {
  let component: ListBonTransfertComponent;
  let fixture: ComponentFixture<ListBonTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
