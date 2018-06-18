import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExecutableCommandService } from '../services/executable-command.service';
import * as Utils from '../Utility/tony-editor.utility';

@Component({
  selector: 'app-tony-editor-toolbar',
  templateUrl: './tony-editor.toolbar.component.html',
  styleUrls: ['./tony-editor.toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  fontName = '';
  fontSize = '';
  hexColor = '';

  @Input() config: any;

  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  constructor(private executableCommandService: ExecutableCommandService ) { }

  ngOnInit() {
  }

  canEnableToolbarOptions(value): boolean {
    
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  triggerCommand(command:  string): void {
    console.log(command);
    this.execute.emit(command);
  }
}
