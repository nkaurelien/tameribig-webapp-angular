// declare function require(path: string);


import {Component, OnInit, HostListener, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RecrutmentService} from '../_services/recrutment.service';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';
import {UploaderOptions} from 'ng-uikit-pro-standard/lib/pro/file-input/classes/mdb-uploader.class';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-recrutment',
  templateUrl: './recrutment.component.html',
  styleUrls: ['./recrutment.component.scss']
})
export class RecrutmentComponent implements OnInit {

  recrutmentForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  file: File;
  maxFileSize = 5 * 1000 * 1000; // bytes
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  uploadDone = false;
  dragOver: boolean;
  options: UploaderOptions;

  @HostListener('input') oninput() {

    if (this.recrutmentForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
      private _router: Router,
      private seo: SeoService,
      private fb: FormBuilder,
      private recrutmentService: RecrutmentService) {

    this.recrutmentForm = fb.group({
      'fullname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'subjects': ['', Validators.required],
      'phone': [''],
      'message': ['', Validators.required],
      'copy': [''],
    });

    this.options = {
      concurrency: 1,
      maxUploads: 1,
      allowedContentTypes: ['application/pdf']
    };

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {

    this.optionsSelect = [
      { value: 'Demande de stage académique', label: 'Demande de stage académique' },
      { value: 'Demande de stage professioneo', label: 'Demande de stage professioneo' },
      { value: 'Demande d\'emplois', label: 'Demande d\'emplois' },
    ];
  }

  onSubmit() {
    this.startUpload();
    // this.recrutmentService.sendMessage(this.contactForm.value).subscribe(() => {
    //   alert('Your message has been sent.');
    //   this.contactForm.reset();
    //   this.disabledSubmitButton = true;
    // }, error => {
    //   console.log('Error', error);
    // });
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'RouteRecrutment',
      method: 'POST',
      data: {
          ...this.recrutmentForm.value
      },
    };
    this.files = [];
    this.uploadDone = false;
    this.uploadInput.emit(event);
    this.disabledSubmitButton = true;
    this.recrutmentForm.reset();
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  onUploadOutput(output: UploadOutput | any): void {

    // console.log('UploadOutput', output, typeof output);
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
      console.log(this.files);
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;

    } else if (output.type === 'done') {
      if (output.file.responseStatus === 200) {
        this.uploadDone = true;
      }
    }
    this.showFiles();
  }

  // onFileAdd(file: File) {
  //   this.file = file;
  // }
  //
  // onFileRemove() {
  //   this.file = null;
  // }
  //
  // uploadFiles() {
  //   const url = 'your-path-to-backend-endpoint'
  //   const data = new FormData();
  //   data.append('file', this.file, this.file.name)
  //
  //   if (this.file.size <= this.maxFileSize) {
  //     this.http.post(url, data);
  //   }
  // }
}
