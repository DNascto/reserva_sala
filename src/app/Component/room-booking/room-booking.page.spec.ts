import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomBookingPage } from './room-booking.page';

describe('RoomBookingPage', () => {
  let component: RoomBookingPage;
  let fixture: ComponentFixture<RoomBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
