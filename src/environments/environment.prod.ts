import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  baseUrl: 'http://localhost:5000/',
  apiKey: 'HcyKuwNhuwfd',
  token: localStorage.getItem('authToken'),
  httpOptions: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
  authenticationService: {
    login: 'authentication/login'
  },
  projectsService: {
    getProjectDetails: 'project-lists',
  }
};
