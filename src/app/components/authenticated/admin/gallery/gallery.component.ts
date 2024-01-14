import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  galleryForm!: FormGroup;
  constructor(private fb: FormBuilder, private route: Router) {}
  ngOnInit() {}
  createGalleryForm() {
    this.galleryForm = this.fb.group({
      title: ['', Validators.required],
      media: this.fb.array([]),
    });
  }

  get control() {
    return this.galleryForm.controls;
  }

  get mediaArr() {
    return this.galleryForm.get('media') as FormArray;
  }

  returnCommonPhotoGroup(){
    return this.fb.group({
      url: [''],
      type: ['PHOTO'],
      thumbnail_url: null
    })
  }

  returnCommonVideoGroup(){
    return this.fb.group({
      url: [''],
      type: ['PHOTO'],
      thumbnail_url: null
    })
  }

  addMedia(){

  }
  onTypeChange() {}
}
