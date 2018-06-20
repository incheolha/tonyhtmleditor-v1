import { Component, OnInit, Input, Output,
         ViewChild, EventEmitter, Renderer2, forwardRef, ElementRef
        } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalConfig } from '../GlobalSetting/tony-editor.global.default';

import { Subject } from 'rxjs/Subject';
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


  translate: string;
  height: string;
  minHeight: string;
  width: string;
  minWidth: string;

  resizer = 'stack';

  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  @Output() focus: EventEmitter<string> = new EventEmitter<string>();
  
  @ViewChild('tonyTextArea') textArea: ElementRef;
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
    
   // this.textArea.nativeElement.innerHTML = this.htmlContent;

    // const div = this.readerer.createElement('div');
    // const text = this.readerer.createText(this.htmlContent);
    // this.readerer.appendChild(div, text);
    // this.readerer.appendChild(this.textArea.nativeElement, div);
    
  }

  writeValue(value: any): void {
    console.log(value);
    if(value === null || value === undefined || value === '' || value === '<br>'){
      value = null;
    }
    this.refreshView(value);
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
    this.textArea.nativeElement.focus();
    console.log(this.textArea.nativeElement.focus());
  }

  onTextAreaBlur(): void {
    // 만일 textarea에서 벗어나면 곧바로 window.section영역을 이용하여 저장함
    this.executableCommandService.savedSelection = Utils.saveSelection();
  }

  resixeTextArea(offsetY: number): void {
    let newHeight = parseInt(this.height, 10);
    newHeight += offsetY;
    this.height = newHeight + 'px';
    this.textArea.nativeElement.style.height = this.height;
  }

  onContentChange(html: string): void {

    console.log(html);
    
    this.executableCommandService.htmlContent.next(html);

  }

  executeCommand(commandName: string): void {
    try {
      console.log(commandName);
      this.executableCommandService.execute(commandName);
    } catch(error) {
      console.log(error);
    }
    return;
  }

  refreshView(value: string): void{
    const normalizedValue = value === null ? '' : value;
    this.readerer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    return;
  }

 }
