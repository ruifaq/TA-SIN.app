import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmapelComponent } from './editmapel.component';

describe('EditmapelComponent', () => {
  let component: EditmapelComponent;
  let fixture: ComponentFixture<EditmapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmapelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
