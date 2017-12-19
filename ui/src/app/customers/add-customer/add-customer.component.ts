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

    this.customerService.customerToEdit
      .subscribe(customerToEdit => {
        this.newCustomer = customerToEdit;
        this.update = true;
    });

    this.newCustomer = this.initNewCustomer();

  }

  public onSubmit(): void {
    if (this.update) {
      this.customerService.updateCustomer(this.newCustomer).subscribe(
        (response: any) => {
          if (response.success === true) {
            this.customerService.updateList.next(true);
            this.update = false;
            this.newCustomer = this.initNewCustomer();
          }
        }
      );
    } else {
      this.customerService.addCustomer(this.newCustomer).subscribe(
        (response: any) => {
          if (response.success === true) {
            this.customerService.updateList.next(true);
            this.newCustomer = this.initNewCustomer();
          }
        }
      );
    }
  }

  private initNewCustomer(): Customer {
    return {
      FirstName: '',
      LastName: '',
      Ratings: '',
      Company: '',
      _id: ''
    };
  }
}
