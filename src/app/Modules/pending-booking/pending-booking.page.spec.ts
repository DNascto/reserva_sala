import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingBookingPage } from './pending-booking.page';

describe('PendingBookingPage', () => {
  let component: PendingBookingPage;
  let fixture: ComponentFixture<PendingBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
