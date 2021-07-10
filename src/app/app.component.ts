import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "task-prismforce";

  constructor(private router: Router) {
    this.authValidation();
  }

  authValidation() {
    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("authToken") !== "undefined" &&
      localStorage.getItem("authToken") !== "null"
    ) {
      this.router.navigateByUrl("home");
    } else {
      this.router.navigateByUrl("auth/login");
    }
  }
}
