import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-dailog-box",
  templateUrl: "./dailog-box.component.html",
  styleUrls: ["./dailog-box.component.scss"],
})
export class DailogBoxComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();
  @Input() type: any;
  filtersData: {};
  storedData: any;
  constructor() {}

  ngOnInit() {
    if (
      localStorage.getItem("storedData") &&
      localStorage.getItem("storedData") !== "undefined" &&
      localStorage.getItem("storedData") !== "null"
    ) {
      this.storedData = JSON.parse(localStorage.getItem("storedData"));
    } else {
      this.clearFilters();
    }
  }

  clearFilters() {
    this.storedData = {
      clientName: "",
      experienceRequired: "",
      experienceRequiredOperand: "null",
      location: "null",
      noOfEmployees: "",
      noOfEmployeesOperand: "null",
      projectName: "",
      skillsRequired: "",
      startDate: "",
      startDateOperand: "null",
    };
  }

  closeModalOnClick() {
    this.closeModal.emit(false);
  }

  search(form: NgForm) {
    localStorage.setItem("storedData", JSON.stringify(form.value));
    this.closeModal.emit(form.value);
  }
}
