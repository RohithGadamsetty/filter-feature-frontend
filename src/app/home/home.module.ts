import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent, DailogBoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DailogBoxComponent]
})
export class HomeModule { }
