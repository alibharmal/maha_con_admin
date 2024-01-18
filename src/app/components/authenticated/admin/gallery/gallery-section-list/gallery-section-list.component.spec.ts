import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySectionListComponent } from './gallery-section-list.component';

describe('GallerySectionListComponent', () => {
  let component: GallerySectionListComponent;
  let fixture: ComponentFixture<GallerySectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallerySectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
