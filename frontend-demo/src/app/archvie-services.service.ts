import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchvieServicesService {
  constructor(private http: HttpClient) { }
  endpoint = "http://localhost:3000/upload";

  getentries(file: File, password: string): Observable<any> {
    console.log(file)
    var formData = new FormData();
    formData.append("filedata", file);
    formData.append("password", password);
    
    return this.http.post(this.endpoint, formData, { responseType: 'json' });
  }
}
