import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExecutableCommandService } from './services/executable-command.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';
  htmlContent = '';
  htmlSubscription: Subscription;

  readingSection: FormGroup;

  constructor(private executableCommandService: ExecutableCommandService) {}


  ngOnInit() {

    this.htmlSubscription = this.executableCommandService.htmlContent.subscribe((html:string) => {
      console.log(html)
      this.htmlContent = html;
    })
  }

  ngOnDestroy() {
    this.htmlSubscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.htmlContent);

    this.readingSection = new FormGroup( {
      'readingSection' : new FormControl(this.htmlContent, Validators.required)
    })

    console.log(this.readingSection.value);
  }

  
}
