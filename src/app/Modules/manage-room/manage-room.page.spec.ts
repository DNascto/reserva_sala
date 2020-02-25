import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageRoomPage } from './manage-room.page';

describe('ManageRoomPage', () => {
  let component: ManageRoomPage;
  let fixture: ComponentFixture<ManageRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
