import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExecutableCommandService } from '../services/executable-command.service';
import { CommandModel } from '../GlobalSetting/command.model';
import * as Utils from '../Utility/tony-editor.utility';

@Component({
  selector: 'app-tony-editor-toolbar',
  templateUrl: './tony-editor.toolbar.component.html',
  styleUrls: ['./tony-editor.toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  command: CommandModel;

  @Input() config: any;

  @Output() execute: EventEmitter<CommandModel> = new EventEmitter<CommandModel>();

  constructor(private executableCommandService: ExecutableCommandService ) { }

  ngOnInit() {
  }

  canEnableToolbarOptions(value): boolean {
    
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  onSquareInsert() {
    console.log(' ■ Symbol Insert');
    this.triggerCommand('insertText', '■')
  }
  triggerCommand(command:  string, value): void {
    this.command = new CommandModel(command, value);
    console.log(this.command);
    this.execute.emit(this.command);
  }
}
