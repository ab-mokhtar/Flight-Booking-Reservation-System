import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/services/Issue/issue.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-display-issues',
  templateUrl: './display-issues.component.html',
  styleUrls: ['./display-issues.component.css'],
})
export class DisplayIssuesComponent implements OnInit {
  user: any[];
  issues: any[];

  displayModal = false;
  constructor(
    private toastr: ToastrService,
    private issueService: IssueService,
    private userService: UserService,
    private router: Router
  ) {
    this.issues = [];
    this.user = [];
  }

  ngOnInit(): void {
 
   

    this.displayModal = true;

    this.issueService.getIssues().subscribe(
      (result: any) => {
        console.log("weslett");
      
          console.log('Issues Successfully');
          this.toastr.success('Issues Successfully', 'Success');
          console.log(result.data);
          this.issues = result;
       
        this.displayModal = false;
      },
      (error) => {
        console.log('Error Occured: ', error.error.msg);
        this.toastr.error('Error', error.error.msg);
        this.displayModal = false;
      }
    );
  }
}
