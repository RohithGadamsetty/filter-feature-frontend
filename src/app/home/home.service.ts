import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  apiUrls: any;

  constructor(private http: HttpClient) {
    this.apiUrls = environment;
  }

  getProjectDetails(Filters): Observable<any> {
    const url =
      this.apiUrls.baseUrl + this.apiUrls.projectsService.getProjectDetails;
    const payload = {
      apiKey: this.apiUrls.apiKey,
      filters: Filters,
      token: this.apiUrls.token,
    };
    const headers = this.apiUrls.headers;
    return this.http.post(url, payload, headers);
  }
}
