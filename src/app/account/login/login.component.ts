import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/providers/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
    loading = false;
    submitted = false;
    user: User = new User();
    userExist: any;
    usrName: any;
    usrPassword: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }


  getUserByUsername(username: any)
  {
    this.accountService.getUser(username)
    .subscribe(res=>{
      this.userExist = res;
      for(var i = 0; i < res.length; i++) {
        var obj = res[i];
        this.usrName = obj.username;
        this.usrPassword = obj.password;
        // console.log(username);
        // this.alertusr();
    }
    })
  }
  
  onSubmit() {
    this.submitted = true;
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;

    
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.getUserByUsername(this.user.username);

    // alert("1: " + this.form.value.username);
    // alert("2: " + this.usrName);
    // alert("3: " + this.form.value.password);
    // alert("4: " + this.usrPassword);
    if(this.form.value.username == this.usrName && this.form.value.password == this.usrPassword)
    {

      alert("success");
      localStorage.setItem('username',this.form.value.username);
      this.router.navigate(['/address']);
      // this.loading = true;
      // this.accountService.login(this.form.value.username, this.form.value.username)
      //     .pipe(first())
      //     .subscribe({
      //         next: () => {
      //             // get return url from query parameters or default to home page
      //             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/address';
      //             this.router.navigateByUrl(returnUrl);
      //         },
      //         error: (error: any) => {
      //           alert("Error!!!!");
      //             this.loading = false;
      //         }
      //     });
    }
    else
    {
      alert("Invalid");
    }
    
   
}

}
