import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/commons/commons.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard]},
  { path: ':orderId', component: InvoiceDetailComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonsModule,
    NgxPaginationModule,
    NgxStarRatingModule,
    SlickCarouselModule,
  ]
})
export class InvoiceModule { }
