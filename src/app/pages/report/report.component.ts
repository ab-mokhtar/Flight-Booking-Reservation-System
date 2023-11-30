import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/services/Issue/issue.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  issue!: any;

  displayModal = false;
 msg!:string
  constructor(
    private issueService: IssueService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {}

  handleFormSubmit() {
    this.issue={msg:this.msg,
     user: {username:localStorage.getItem('id')}}
     console.log(this.issue);
     
    this.displayModal = true;
    this.issueService.addIssue(this.issue).subscribe(
      (result: any) => {
        console.log(result);
        
          console.log('Issue raised successfully');
          this.toastr.success('Issue raised successfully', 'Success');
          this.issue = '';
       

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
