import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomersComponent } from './customers.component';
import { CustomerShowComponent } from './customer-show/customer-show.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    CustomerShowComponent,
  ],
  imports: [SharedModule],
})
export class CustomersModule {}
