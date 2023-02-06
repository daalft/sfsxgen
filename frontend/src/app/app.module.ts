import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatRadioModule} from '@angular/material/radio'; 
import { XGenComponent } from 'src/components/xgen.component';
import {MatSelectModule} from '@angular/material/select'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { XGenGeneratorComponent } from 'src/components/xgen.generator';
import { CrosswordComponent } from 'src/components/crossword.component';
import { LessonPreparerComponent } from 'src/components/lesson.preparer.component';
import { PleaseWaitComponent } from 'src/components/waiter.component';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    XGenComponent,
    XGenGeneratorComponent,
    CrosswordComponent,
    LessonPreparerComponent,
    PleaseWaitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [MatGridListModule, PleaseWaitComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
