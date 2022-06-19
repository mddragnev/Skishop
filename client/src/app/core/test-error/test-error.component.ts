import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  public validationErrors: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    });
  }

}
