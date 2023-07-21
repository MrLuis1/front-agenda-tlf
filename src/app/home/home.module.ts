import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { FormAddComponent } from './components/form-add/form-add.component';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';


@NgModule({
  declarations: [
    AgendaComponent,
    FormAddComponent,
    ListContactComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
