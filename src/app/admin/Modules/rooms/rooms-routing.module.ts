import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddEditRoomsComponent } from './components/add-edit-rooms/add-edit-rooms.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'add', component: AddEditRoomsComponent, title: 'add' },
  { path: 'edit/:id', component: AddEditRoomsComponent, title: 'edit' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
