import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGuruComponent } from './profile-guru.component';

describe('ProfileGuruComponent', () => {
  let component: ProfileGuruComponent;
  let fixture: ComponentFixture<ProfileGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
