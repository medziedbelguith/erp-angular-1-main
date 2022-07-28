import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHtmlComponent } from './role-html.component';

describe('RoleHtmlComponent', () => {
  let component: RoleHtmlComponent;
  let fixture: ComponentFixture<RoleHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
