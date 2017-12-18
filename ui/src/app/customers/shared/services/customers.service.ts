import { Injectable }   from '@angular/core';
import { HttpClient,
         HttpHeaders }  from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import { Customer }     from '../types/customer';

import 'rxjs/add/operator/map';
import { Subject }      from 'rxjs/Subject';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  public customerToEdit: Subject<any> = new Subject();

  private serverApi: string = 'http://localhost:3000';

  public getAllCustomers(): Observable<Array<Customer>> {

    const URI: string = `${this.serverApi}/customers/`;
    return this.http.get(URI)
      .map(res => <Array<Customer>>res['customers']);
  }

  public deleteCustomer(customerId: string): Observable<any> {
    const URI: string  = `${this.serverApi}/customers/${customerId}`;
    const headers: HttpHeaders  = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers})
      .map(res => res);
  }

  public addCustomer(customer: Customer): Observable<any>  {
      const URI: string  = `${this.serverApi}/customers/`;
      const headers: HttpHeaders  = new HttpHeaders();
      const body: any = {FirstName: customer.FirstName, LastName: customer.LastName, Company: customer.Company, Ratings: customer.Ratings};
      headers.append('Content-Type', 'application/json');
      return this.http.post(URI, body, {headers: headers})
        .map(res => res);
    }

  public updateCustomer(customer: Customer): Observable<any>  {
    const URI: string  = `${this.serverApi}/customers/${customer._id}`;
    const headers: HttpHeaders = new HttpHeaders();
    const body: any = {FirstName: customer.FirstName, LastName: customer.LastName, Company: customer.Company, Ratings: customer.Ratings};
    headers.append('Content-Type', 'application/json');
    return this.http.put(URI, body, {headers: headers})
      .map(res => res);
  }
}
