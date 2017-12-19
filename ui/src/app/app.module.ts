import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule,
         ReactiveFormsModule }    from '@angular/forms';

import { AppComponent }           from './app.component';
import { CustomerService }        from './customers/shared/services/customers.service';
import { AddCustomerComponent }   from './customers/add-customer/add-customer.component';
import { CustomersListComponent } from './customers/customer-list/customers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    CustomersListComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
