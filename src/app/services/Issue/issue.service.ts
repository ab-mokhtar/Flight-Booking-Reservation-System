import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH, TOKEN_PREFIX } from 'src/app/constants/IMPData';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issues: any[];

  constructor(private http: HttpClient) {
    this.issues = [];
  }

  getIssues():Observable<any[]> {

    return this.http.get<any[]>(
      `${API_PATH}/issue/all`
    );
  }

  addIssue(issue: any) :Observable<any>{

    return this.http.post<any>(
      `${API_PATH}/issue/add`,issue
     
      
    );
  }
}
