import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveClientComponent } from './releve-client.component';

describe('ReleveClientComponent', () => {
  let component: ReleveClientComponent;
  let fixture: ComponentFixture<ReleveClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
