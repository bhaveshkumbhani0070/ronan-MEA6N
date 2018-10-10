import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifieMobileComponent } from './verifie-mobile.component';

describe('VerifieMobileComponent', () => {
  let component: VerifieMobileComponent;
  let fixture: ComponentFixture<VerifieMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifieMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifieMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
