import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppService} from './app.service';

import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ToastModule,
    TableModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [
    AppService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
