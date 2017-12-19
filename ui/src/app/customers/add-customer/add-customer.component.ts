import { Component,
         OnInit }           from '@angular/core';
import { FormControl,
         FormGroup }        from '@angular/forms';
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

  public form: FormGroup;
  private update: boolean = false;

  ngOnInit(): void {

    this.customerService.customerToEdit
      .subscribe(customerToEdit => {
        this.form.patchValue(customerToEdit);
        this.update = true;
    });

    this.form = this.initForm();

  }

  public onSubmit(): void {
    if (this.update) {
      this.customerService.updateCustomer(this.form.value).subscribe(
        (response: any) => {
          if (response.success === true) {
            this.customerService.updateList.next(true);
            this.update = false;
            this.form.reset();
          }
        }
      );
    } else {
      this.customerService.addCustomer(this.form.value).subscribe(
        (response: any) => {
          if (response.success === true) {
            this.customerService.updateList.next(true);
            this.form.reset();
          }
        }
      );
    }
  }

  private initForm(): FormGroup {
    return new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Ratings: new FormControl(''),
      Company: new FormControl(''),
      _id: new FormControl('')
    });
  }
}
