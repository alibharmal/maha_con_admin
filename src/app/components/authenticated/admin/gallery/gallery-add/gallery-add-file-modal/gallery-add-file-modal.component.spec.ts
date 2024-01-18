import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAddFileModalComponent } from './gallery-add-file-modal.component';

describe('GalleryAddFileModalComponent', () => {
  let component: GalleryAddFileModalComponent;
  let fixture: ComponentFixture<GalleryAddFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryAddFileModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryAddFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
