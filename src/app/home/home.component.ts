import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HomeService } from "./home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  projectDetails = [];
  displayProjectDetails = [];
  currentIndex = 0;
  tableLimit = 5;
  isShowDialog = false;
  dialogType = "";
  isLoading = false;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.getStoredFilters();
  }

  getStoredFilters() {
    if (
      localStorage.getItem("storedData") &&
      localStorage.getItem("storedData") !== "undefined" &&
      localStorage.getItem("storedData") !== "null"
    ) {
      const storedData = JSON.parse(localStorage.getItem("storedData"));
      this.onCloseDialog(storedData);
    } else {
      const filters = [];
      this.getProjectDetails(filters);
    }
  }

  getProjectDetails(filters) {
    this.isLoading = true;
    this.homeService
      .getProjectDetails(filters)
      .subscribe((projectDetailsResponse) => {
        this.isLoading = false;
        this.projectDetails = projectDetailsResponse.result;
        this.currentIndex = 1;
        this.isShowDialog = false;

        this.displayProjectDetails = this.projectDetails.slice(
          0,
          this.tableLimit
        );
      });
  }

  returnArraylength() {
    return Array(Math.ceil(this.projectDetails.length / this.tableLimit));
  }

  getPagination(value) {
    if (value === "previous") {
      value = this.currentIndex - 1;
    }
    if (value === "next") {
      value = this.currentIndex + 1;
    }
    const index = (value - 1) * this.tableLimit;
    this.currentIndex = value;
    this.displayProjectDetails = this.projectDetails.slice(
      index,
      index + this.tableLimit
    );
  }

  async onCloseDialog(event) {
    this.isShowDialog = false;
    if (!event) {
      return;
    }
    let conditionKeys = {
      in: ["projectName", "clientName", "skillsRequired"],
      eq: ["location"],
    };
    let condition,
      filterType,
      filters = [];
    for (let key in event) {
      let value = event[key];
      filterType = "string";
      condition = null;
      if (conditionKeys.in.indexOf(key) !== -1 && value) {
        condition = "in";
      } else if (
        conditionKeys.eq.indexOf(key) !== -1 &&
        value &&
        value !== "null"
      ) {
        condition = "==";
      } else if (
        key === "noOfEmployees" &&
        value &&
        event.noOfEmployeesOperand &&
        event.noOfEmployeesOperand !== "null"
      ) {
        condition = event.noOfEmployeesOperand;
        filterType = "number";
        value = Number(value);
      } else if (
        key === "experienceRequired" &&
        value &&
        value !== "null" &&
        event.experienceRequired &&
        event.experienceRequiredOperand &&
        event.experienceRequiredOperand !== "null"
      ) {
        condition = event.experienceRequiredOperand;
        filterType = "number";
        value = Number(value);
      } else if (
        key === "startDate" &&
        value &&
        event.startDate &&
        event.startDateOperand &&
        event.startDateOperand !== "null"
      ) {
        condition = event.startDateOperand;
        filterType = "number";
        var dateString = String(value) + " 00:00",
          dateTimeParts = dateString.split(" "),
          timeParts = dateTimeParts[1].split(":"),
          dateParts = dateTimeParts[0].split("-"),
          date;

        date = new Date(
          parseInt(dateParts[0]),
          parseInt(dateParts[1], 10) - 1,
          parseInt(dateParts[2]),
          parseInt(timeParts[0]),
          parseInt(timeParts[1])
        );
        value = Math.round(date.getTime() / 1000 + 19800);
        console.log(value);
      }
      if (condition) {
        filters.push({
          name: key,
          filterType: filterType,
          condition: condition,
          value: value,
        });
      }
    }
    this.getProjectDetails(filters);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
  }
}
