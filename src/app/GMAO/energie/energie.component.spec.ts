import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergieComponent } from './energie.component';

describe('EnergieComponent', () => {
  let component: EnergieComponent;
  let fixture: ComponentFixture<EnergieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
