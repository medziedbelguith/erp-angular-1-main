import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDevisComponent } from './details-devis.component';

describe('DetailsDevisComponent', () => {
  let component: DetailsDevisComponent;
  let fixture: ComponentFixture<DetailsDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
