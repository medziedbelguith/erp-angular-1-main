import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonTravailHtmlComponent } from './bon-travail-html.component';

describe('BonTravailHtmlComponent', () => {
  let component: BonTravailHtmlComponent;
  let fixture: ComponentFixture<BonTravailHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonTravailHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonTravailHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
