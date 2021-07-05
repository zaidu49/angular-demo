import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/providers/address.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {
  formValue !: FormGroup;
  address: Address = new Address();
  addressData: any;
  showAdd! : boolean;
  showUpdate !: boolean;
  usrname!: any;
  loggedIn!: boolean;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private addressService: AddressService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      houseNumber: [''],
      addressLine1: [''],
      addressLine2: [''],
      town: [''],
      county: [''],
      postcode: [''],
    })
    this.usrname = localStorage.getItem('username');
    this.getAllAddress();
    this.getMyAddress(this.usrname);
    if(this.usrname)
    {
      this.loggedIn =true;
    }
    else
    {
      this.loggedIn = false;
    }
  }

  getAllAddress()
  {
    this.addressService.getAddress()
    .subscribe(res=>{
      this.addressData=res;
    })
  }

  getMyAddress(username:any)
  {
    this.addressService.getMyAddress(username)
    .subscribe(res=>{
      this.addressData=res;
    })
  }

  clickAddAddress()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addAddress()
  {
    this.address.houseNumber = this.formValue.value.houseNumber;
    this.address.addressLine1 = this.formValue.value.addressLine1;
    this.address.addressLine2 = this.formValue.value.addressLine2;
    this.address.town = this.formValue.value.town;
    this.address.county = this.formValue.value.county;
    this.address.postcode = this.formValue.value.postcode;
    this.address.username = this.usrname;

    this.addressService.addAdress(this.address)
    .subscribe(res=>{
      console.log(res);
      alert("Address added");
      let cancelModal = document.getElementById('cancel')
      cancelModal?.click();
      this.formValue.reset();
      this.getAllAddress();
    },
    err=>{
      alert("Errorr!!");
    })
  }

  deleteAddress(address: any)
  {
    this.addressService.deleteAddress(address.id)
    .subscribe(res=>{
      alert("Address deleted");
      this.getAllAddress();
    })
  }

  onEditAddress(address: any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.address.id = address.id;
    this.formValue.controls['houseNumber'].setValue(address.houseNumber);
    this.formValue.controls['addressLine1'].setValue(address.addressLine1);
    this.formValue.controls['addressLine2'].setValue(address.addressLine2);
    this.formValue.controls['town'].setValue(address.town);
    this.formValue.controls['county'].setValue(address.county);
    this.formValue.controls['postcode'].setValue(address.postcode);
  }

  updateAddress()
  {
    this.address.houseNumber = this.formValue.value.houseNumber;
    this.address.addressLine1 = this.formValue.value.addressLine1;
    this.address.addressLine2 = this.formValue.value.addressLine2;
    this.address.town = this.formValue.value.town;
    this.address.county = this.formValue.value.county;
    this.address.postcode = this.formValue.value.postcode;

    this.addressService.updateAddress(this.address, this.address.id)
    .subscribe(res=>{
      alert("Address Updated");
      let cancelModal = document.getElementById('cancel')
      cancelModal?.click();
      this.formValue.reset();
      this.getAllAddress();
    })
  }

  goToRegister()
  {
    this.router.navigate(['/register']);
  }
}
