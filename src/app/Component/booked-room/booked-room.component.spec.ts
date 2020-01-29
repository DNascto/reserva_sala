import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedRoomComponent } from './booked-room.component';

describe('BookedRoomComponent', () => {
  let component: BookedRoomComponent;
  let fixture: ComponentFixture<BookedRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedRoomComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
