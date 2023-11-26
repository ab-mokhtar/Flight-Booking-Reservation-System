import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/User/user-auth.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userAddBool=false
  btnValue = 'Add user';
  userFormGroup!:FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private route: ActivatedRoute,
              private http : HttpClient,
              private router: Router,
              public userAuthService:UserAuthService) {
    if (this.userAuthService.isLoggedIn()){
      this.router.navigate(["/cars"]);
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {

      this.formGroupInit();
    });

  }
  onSubmit(){

    if(this.userFormGroup.invalid){
      this.userFormGroup.markAllAsTouched();
      return;
    }

    if(this.userPassword?.value != this.userConfirmPassword?.value){
      alert("not matched password")
      return;
    }

    this.insertUser();

    this.userFormGroup.reset();

  }

  matchedPassword(pass1 : string, pass2:string){

  }

  get username(){return this.userFormGroup.get('userInfo.username');}
  get userFirstName(){return this.userFormGroup.get('userInfo.userFirstName');}
  get userLastName(){return this.userFormGroup.get('userInfo.userLastName');}
  get userPassword(){return this.userFormGroup.get('userInfo.userPassword');}
  get userConfirmPassword(){return this.userFormGroup.get('userInfo.userConfirmPassword');}
  formGroupInit(){
    this.userFormGroup = this.formBuilder.group({
      userInfo : this.formBuilder.group({
        userFirstName : new FormControl('', [
          Validators.required,
          Validators.minLength(2)]),
        userLastName : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        username : new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        userPassword : new FormControl('',[
          Validators.required,
          Validators.minLength(2)]),
        userConfirmPassword : new FormControl('',[
          Validators.required,
          Validators.minLength(2)])
      })
    });
  }
  insertUser(){
    let user = new User();


    user.username = this.username?.value;
    user.userFirstName = this.userFirstName?.value;
    user.userLastName = this.userLastName?.value;
    user.userPassword = this.userPassword?.value;

    this.userService.addNewUser(user).subscribe( data=>{
       this.userAddBool = true;
     },error => {
       alert("There was an error: "+error.message());
     });
  }
}
