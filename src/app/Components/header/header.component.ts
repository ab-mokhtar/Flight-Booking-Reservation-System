import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.adminRole = false;
    this.displayWelcomeHeader = true;
  }

  ngOnInit(): void {
    
    this.refreshHeader()
    if (localStorage.getItem('id')) {
      this.user.push(1);
    }
    this.adminRole=this.userAuthService.getRoles()
    console.log(this.userAuthService.getRoles())
    this.adminRole=this.adminRole[0].roleName==="Admin"
    
    
  }
  refreshHeader() {
    // Your initialization logic here...
    this.displayWelcomeHeader = !this.userAuthService.isLoggedIn();
    // other initialization code...
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
