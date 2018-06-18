import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TonyEditorComponent } from './tony-editor/tony-editor.component';
import { ExecutableCommandService } from './services/executable-command.service';
import { ToolbarComponent } from './tony-editor.toolbar/tony-editor.toolbar.component'
@NgModule({
  declarations: [
    AppComponent,
    TonyEditorComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [ExecutableCommandService, MDBSpinningPreloader],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
