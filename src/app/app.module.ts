import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { FreelancerGridComponent } from './freelancer-grid/freelancer-grid.component';
import { FilterComponent } from './filter/filter-component';
import { freelancersReducer } from './freelancer-grid/freelancers.reducer';
import { filterReducer } from './filter/filter-reducer';
import { RealtimeFreelancersService } from './freelancer.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FreelancerGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore({freelancers : freelancersReducer, filter : filterReducer})
  ],
  providers: [RealtimeFreelancersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
