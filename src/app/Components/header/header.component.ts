import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_ROLE } from 'src/app/constants/IMPData';
import { UserAuthService } from 'src/app/services/User/user-auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayWelcomeHeader: boolean;

  imageSrc = 'assets/Images/menu2.png';
  user: any[];
  adminRole: any;
  constructor(private userAuthService: UserAuthService, private router: Router) {
    this.user = [];
    this.adminRole = ADMIN_ROLE;
    this.displayWelcomeHeader = true;
  }

  ngOnInit(): void {
    if (localStorage.getItem('displayWelcomeHeader')) {
      this.displayWelcomeHeader = false;
    }
    if (localStorage.getItem('id')) {
      this.user.push(1);
    }
    
  }

  displayUser() {
    console.log('user : ', this.user);
  }

  handleLogout() {
  
      this.userAuthService.clear();
      this.user=[]
    
    this.router.navigate(['/login-page']);
  }

  handleHeaderRemove() {
    this.displayWelcomeHeader = false;
    localStorage.setItem('displayWelcomeHeader', 'false');
  }
}
