import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonAchatComponent } from './list-bon-achat.component';

describe('ListBonAchatComponent', () => {
  let component: ListBonAchatComponent;
  let fixture: ComponentFixture<ListBonAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
