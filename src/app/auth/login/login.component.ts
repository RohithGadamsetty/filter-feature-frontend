import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPassword: boolean;
  isLoading: boolean;
  isAuthInvalid: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  patterns(type) {
    let pattern = "\\s*(\\S\\s*){8,}";
    if (type === "email") {
      pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    } else if (type === "number") {
      pattern = "[6-9][0-9]{9}";
    }
    return pattern;
  }

  OnSubmit(f) {
    this.isLoading = true;
    const email = f.value.email;
    const password = f.value.password;
    this.authService.login(email, password).subscribe(
      (loginResponse) => {
        environment.token = loginResponse.result.token;
        localStorage.setItem("authToken", loginResponse.result.token);
        this.router.navigateByUrl("home");
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isAuthInvalid = true;
      }
    );
  }
}
