import { Component, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output() submitFile: EventEmitter<FormData> = new EventEmitter<FormData>();

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  imfile: any; 
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  }); 

  onFileChange(event:any) {
    
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.fileAttr= file.name;
        this.myForm.patchValue({
          fileSource: file
        });
      }
      else {
        this.fileAttr = 'Choose File';
      }
    }
  constructor() { }

  onSubmit() {    
    const formData = new FormData();
    const file=this.myForm.get('fileSource')?.value;
    formData.append('file', file,file.name);
    this.submitFile.emit(formData);
  }

}