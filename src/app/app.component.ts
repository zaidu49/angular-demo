import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  usrname!: any;
  loggedIn!: boolean;
  
  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.usrname = localStorage.getItem('username');

      if(this.usrname)
    {
      this.loggedIn =true;
    }
    else
    {
      this.loggedIn = false;
    }
    }

  goToRegister()
  {
    this.router.navigate(['/register']);
  }
  goToLogin()
  {
    this.router.navigate(['/login']);
  }
  goToAddressList()
  {
    this.router.navigate(['/address-list']);
  }
  goToMyAddress()
  {
    this.router.navigate(['/my-address']);
  }
  logout()
  {
    localStorage.removeItem('username');
    this.router.navigate(['/address-list']);
  }
  
  
}
