import { Component,
         OnInit }          from '@angular/core';
import { CustomerService } from '../shared/services/customers.service';
import { Customer }        from '../shared/types/customer';

@Component({
  selector: 'app-view-customer',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomersListComponent implements OnInit {

  constructor(private customerService: CustomerService) {
  }

  private customers: Array<Customer> = [];

  ngOnInit(): void {
    this.loadLists();
  }

  public editCustomer(customer: Customer): void {
    this.customerService.customerToEdit.next(customer);
  }

  public loadLists(): void {

    //Get all lists from server and update the lists property
    this.customerService.getAllCustomers().subscribe(
      response => this.customers = response);

  }

  public deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer._id).subscribe(
      response => this.customers = this.customers.filter(customers => customers !== customer));

  }
}
