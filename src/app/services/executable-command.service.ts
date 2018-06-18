import { Injectable, Inject } from '@angular/core';
import * as utils from './../Utility/tony-editor.utility';

@Injectable() 
export class ExecutableCommandService {

    // text area내 벗어나면 blur 기능을 수행하고 곧바로 작업한 내용을 저장하기위한 용도

    savedSelection: any = undefined;


}