import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
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
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthenticationService,
    private eventService: EventService
  ) {}
  ngOnInit() {
    console.log("thsi is token ", this.authService.userToken());

    this.eventService.getEvent().subscribe({
      next: (res) => {
        console.log("thsi is res of get event ", res);
      },
      error: (error) => {
        console.log("thsi is error get event ", error);
      },
    });
  }

  updateEvent() {}
}
