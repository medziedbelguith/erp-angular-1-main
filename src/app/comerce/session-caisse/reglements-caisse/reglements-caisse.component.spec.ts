import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsCaisseComponent } from './reglements-caisse.component';

describe('ReglementsCaisseComponent', () => {
  let component: ReglementsCaisseComponent;
  let fixture: ComponentFixture<ReglementsCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementsCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
