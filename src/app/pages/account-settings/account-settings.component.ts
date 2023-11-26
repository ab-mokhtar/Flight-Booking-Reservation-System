import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  displayModal = false;

  currentUserData: any[];

  // Update Account Details Variables
  name: string;
  phoneNo: string;

  // Change Password Variables
  oldPassword: string;
  password: string;
  confirmPassword: string;

  // Delete Account
  deleteAccountPassword: string;
  isSureToDelete: boolean;
  isAgreeToDataLoss: boolean;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.currentUserData = [];
    this.name = '';
    this.phoneNo = '';

    this.oldPassword = '';
    this.password = '';
    this.confirmPassword = '';

    this.deleteAccountPassword = '';
    this.isSureToDelete = false;
    this.isAgreeToDataLoss = false;
  }

  ngOnInit(): void {
  
    
  }

  handleUpdateAccoutDetails(event: Event) {
   
      
  }

  handleChangePassword(event: Event) {
   
  }
}
