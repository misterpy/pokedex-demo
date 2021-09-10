import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtlistComponent } from './caughtlist.component';

describe('CaughtlistComponent', () => {
  let component: CaughtlistComponent;
  let fixture: ComponentFixture<CaughtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaughtlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaughtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
