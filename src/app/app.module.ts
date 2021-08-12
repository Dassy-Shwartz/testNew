import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './details/details.component';
import { SeetComponent } from './seet/seet.component';
import { TableRowComponent } from './table-row/table-row.component';

import { FilterCellsPipe } from './pipeCostam/filterCells';
import { BoldPipe } from './pipeCostam/bold';

import {MatProgressBarModule} from '@angular/material/progress-bar'

import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    SeetComponent,
    TableRowComponent,FilterCellsPipe,BoldPipe
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,FormsModule,
    MatIconModule,MatProgressBarModule,
    MatTableModule,
    MatSliderModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
