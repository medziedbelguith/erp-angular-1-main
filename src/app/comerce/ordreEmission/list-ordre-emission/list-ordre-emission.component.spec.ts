import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdreEmissionComponent } from './list-ordre-emission.component';

describe('ListOrdreEmissionComponent', () => {
  let component: ListOrdreEmissionComponent;
  let fixture: ComponentFixture<ListOrdreEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdreEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdreEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
