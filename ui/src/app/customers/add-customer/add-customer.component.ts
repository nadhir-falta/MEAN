import { Component,
         OnInit }           from '@angular/core';
import { Customer }         from '../shared/types/customer';
import { CustomerService }  from '../shared/services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) {
  }

  private newCustomer: Customer;
  private update: boolean = false;

  ngOnInit(): void {
    this.customerService.customerToEdit.subscribe(customerToEdit => {
      this.newCustomer = customerToEdit;
      this.update = true;
    });
    this.newCustomer = {
      FirstName: '',
      LastName: '',
      Ratings: '',
      Company: '',
      _id: ''
    };
  }

  public onSubmit(): void {
    if (this.update) {
      this.customerService.updateCustomer(this.newCustomer).subscribe(
        (response: any) => {
          if (response.success === true) {
            //If success, update the view-list component
            this.update = false;
          }
        }
      );
    } else {
      this.customerService.addCustomer(this.newCustomer).subscribe(
        (response: any) => {
          if (response.success === true) {
            //If success, update the view-list component
          }
        }
      );
    }
  }
}
