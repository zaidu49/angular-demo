import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, isEmpty } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/providers/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form !: FormGroup;
    loading = false;
    submitted = false;
    user: User = new User();
    usersData: any;
    userExist: any;
    usr: any;
    
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  this.getAllUsers();
  // this.getUserByUsername('aa');
  // this.alertusr();
  
//  alert(JSON.stringify(this.userExist));
  }
  getAllUsers()
  {
    this.accountService.getUsers()
    .subscribe(res=>{
      this.usersData = res;
    })
  }
  // alertusr()
  // {
  //   if(this.usr == 'aa')
  //   {
  //     alert("ss");
  //   }
  //   else{
  //     alert("nn");
  //   }
  // }

  getUserByUsername(username: any)
  {
    this.accountService.getUser(username)
    .subscribe(res=>{
      this.userExist = res;
      for(var i = 0; i < res.length; i++) {
        var obj = res[i];
        this.usr = obj.username;
        console.log(obj.username);
        // this.alertusr();
    }
    })
  }

  checkExist(user1 : any, user2:any)
  {
    if(user1 == user2 )
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    
    // this.getAllUsers();
    
    this.getUserByUsername(this.user.username);
    
    var usrExist = this.checkExist(this.user.username, this.usr)
    // alert("11" + this.user.username);
    // alert("22" + this.usr);
    if(usrExist)
    {
      alert("already exist");
    }
    else{
      // alert(this.user.username);
      this.loading = true;
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  alert('Registration successful');
                  this.loading = false;
                  // this.router.navigate(['/login']);
              },
              error: (error: any) => {
                 alert("Error!!!!");
                  this.loading = false;
              }
          });
    }
    
}
}
