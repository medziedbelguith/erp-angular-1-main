import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonRetourClientComponent } from './list-bon-retour-client.component';

describe('ListBonRetourClientComponent', () => {
  let component: ListBonRetourClientComponent;
  let fixture: ComponentFixture<ListBonRetourClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonRetourClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonRetourClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
