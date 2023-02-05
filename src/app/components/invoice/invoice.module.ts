import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: ':orderId', component: InvoiceDetailComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
