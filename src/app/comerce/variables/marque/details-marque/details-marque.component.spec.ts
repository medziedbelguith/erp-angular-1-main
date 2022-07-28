import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMarqueComponent } from './details-marque.component';

describe('DetailsMarqueComponent', () => {
  let component: DetailsMarqueComponent;
  let fixture: ComponentFixture<DetailsMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
