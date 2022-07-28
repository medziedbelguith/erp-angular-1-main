import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBPsComponent } from './ligne-bps.component';

describe('LigneBPsComponent', () => {
  let component: LigneBPsComponent;
  let fixture: ComponentFixture<LigneBPsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBPsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
