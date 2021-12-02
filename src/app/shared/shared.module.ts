import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MoneySliderComponent } from './components/money-slider/money-slider.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuProjectThumnailComponent } from './components/menu-bar/menu-project-thumnail/menu-project-thumnail.component';
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";

const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule
];

const components = [
  MenuBarComponent
];



@NgModule({
  declarations: [
    ...components,
    MenuBarComponent,
    MoneySliderComponent,
    FileUploadComponent,
    MenuProjectThumnailComponent
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
    MoneySliderComponent,
    FileUploadComponent
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}
