import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/services/Issue/issue.service';

@Component({
  selector: 'app-my-issues',
  templateUrl: './my-issues.component.html',
  styleUrls: ['./my-issues.component.css']
})
export class MyIssuesComponent implements OnInit {
issues:any=[];
  constructor(private router:Router,
    private issuesService:IssueService) { }

  ngOnInit(): void {
    this.issues =[]
    let id=localStorage.getItem('id') 
    this.issuesService.getIssueByUserId(id).subscribe(
      data=>{this.issues=data;
        console.log("history",this.issues)},
        error=>{}
    );
  }

}
