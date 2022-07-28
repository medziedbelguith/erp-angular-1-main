import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveClientDetailleComponent } from './releve-client-detaille.component';

describe('ReleveClientDetailleComponent', () => {
  let component: ReleveClientDetailleComponent;
  let fixture: ComponentFixture<ReleveClientDetailleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveClientDetailleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveClientDetailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
