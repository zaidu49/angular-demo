import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';

  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

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
  }
  
  
}
