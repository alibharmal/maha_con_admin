import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { EventService } from "src/app/services/event/event.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent {
  eventForm!: FormGroup;
  eventData: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthenticationService,
    private eventService: EventService
  ) {}
  ngOnInit() {
    console.log("thsi is token ", this.authService.userToken());
    this.createEventForm();
  }

  get control() {
    return this.eventForm.controls;
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      description: ["", Validators.required],
      whyVietnam: ["", Validators.required],
      streamLink: ["", Validators.required],
      streamTitle: ["", Validators.required],
      banners: this.fb.array([]),
    });

    this.getEventDetails();
  }

  getEventDetails() {
    this.eventService.getEvent().subscribe({
      next: (res) => {
        console.log("thsi is res of get event ", res);
        if (res) {
          this.eventData = res.data;
          this.control["description"].patchValue(this.eventData.description);
          this.control["whyVietnam"].patchValue(this.eventData.whyVietnam);
          this.control["streamTitle"].patchValue(this.eventData.streamTitle);
          this.control["streamLink"].patchValue(this.eventData.streamLink);
        }
      },
      error: (error) => {
        console.log("thsi is error get event ", error);
      },
    });
  }

  updateEvent() {
    if (this.eventForm.valid) {
      let formData = this.eventForm.getRawValue();

      formData["itineraries"] = this.eventData.itineraries;
      formData["venues"] = this.eventData.venues;

      console.log("this is final res ", formData);
    } else {
      this.eventForm.markAllAsTouched();
    }
  }
}
