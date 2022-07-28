import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBTsComponent } from './ligne-bts.component';

describe('LigneBTsComponent', () => {
  let component: LigneBTsComponent;
  let fixture: ComponentFixture<LigneBTsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBTsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
