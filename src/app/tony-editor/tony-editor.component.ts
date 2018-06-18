import { Component, OnInit, Input, Output,
         ViewChild, EventEmitter, Renderer2, forwardRef
        } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GlobalConfig } from '../GlobalSetting/tony-editor.global.default';

import { ExecutableCommandService } from '../services/executable-command.service';
import * as Utils from '../Utility/tony-editor.utility';

@Component({
  selector: 'app-tony-editor',
  templateUrl: './tony-editor.component.html',
  styleUrls: ['./tony-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TonyEditorComponent),
      multi: true
    }
  ]
})
export class TonyEditorComponent implements OnInit, ControlValueAccessor {


  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  @Output() focus: EventEmitter<string> = new EventEmitter<string>();
  
  @ViewChild('tonyTextArea') textArea: any;
  @ViewChild('tonyWrapper') tonyWrapper: any;
  
  Utils: any = Utils;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  config = GlobalConfig;


  constructor(private executableCommandService: ExecutableCommandService,
              private readerer: Renderer2            
  ) { }

  ngOnInit() {
    console.log(this.config.editable);
    console.log(this.config.height);
    console.log(this.config.placeholder);
  }

  writeValue(value: any): void {
    console.log(value);
    if(value === null || value === undefined || value === '' || value === '<br>'){
      value = null;
    }
 }

 registerOnChange(fn: any): void {
   this.onChange = fn;
 }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
 onTextAreaFocus() {
    this.focus.emit('focus');
    console.log(this.focus);
    return;
  }
  onEditorFocus() {
    this.textArea.navtiveElement.focus();
    console.log(this.textArea.nativeElement.focus());
  }

  onTextAreaBlur(): void {
    // 만일 textarea에서 벗어나면 곧바로 window.section영역을 이용하여 저장함
    this.executableCommandService.savedSelection = Utils.saveSelection();
  }


  onContentChange(html: string): void {

    console.log(html);

  }

}
