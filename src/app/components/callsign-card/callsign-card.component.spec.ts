import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsignCardComponent } from './callsign-card.component';

describe('CallsignCardComponent', () => {
  let component: CallsignCardComponent;
  let fixture: ComponentFixture<CallsignCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallsignCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallsignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
