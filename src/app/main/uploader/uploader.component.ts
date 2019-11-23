import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import { DropzoneComponent , DropzoneDirective,
    DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from 'ng-uikit-pro-standard';
import {environment} from '../../../environments/environment';
import { AuthenticationService } from '@app/auth2/_services';

@Component({
    selector: 'app-uploader',
    // moduleId: 'src/app/uploader.component',
    templateUrl: './uploader.component.html',
    styleUrls: [ './uploader.component.scss' ]
})
export class UploaderComponent implements OnInit, AfterViewInit {
    // public type = 'component';
    public type = 'directive';
    public disabled = false;
    public config: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null,
        autoProcessQueue: false,
        // acceptedFiles: 'image/*'
    };

    @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;

    @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

    public dropzone: any;

    public errors = [];
    public imagesUploadedWithSuccess = [];

    private validatingForm: FormGroup;
    private user: any;




    get prixInput() { return this.validatingForm.get('prix'); }
    get titreInput() { return this.validatingForm.get('titre'); }
    get descInput() { return this.validatingForm.get('description'); }
    get tagsInput() { return this.validatingForm.get('tags'); }

    constructor(
        private _auth: AuthenticationService,
        private toast: ToastService
    ) {}

    ngOnInit() {
        this.validatingForm = new FormGroup({
            titre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            prix: new FormControl(null, [Validators.required, Validators.min(50)]),
            description: new FormControl(null, [ Validators.minLength(3), Validators.maxLength(100)]),
            tags: new FormControl(null, null),
        });

        this._auth.loggedIn$.subscribe( ({loggedIn, routerState, user}) => {
            this.user = user;
        });
    }
    public toggleType(): void {
        this.type = (this.type === 'component') ? 'directive' : 'component';
    }

    submit() {
        console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        if (this.validatingForm.valid) {
            this.dropzone.processQueue();
        } else {
            this.errors = ['Formulaire invalide'];
        }
    }

    public toggleDisabled(): void {
        this.disabled = !this.disabled;
    }

    public toggleAutoReset(): void {
        this.config.autoReset = this.config.autoReset ? null : 5000;
        this.config.errorReset = this.config.errorReset ? null : 5000;
        this.config.cancelReset = this.config.cancelReset ? null : 5000;
    }

    public toggleMultiUpload(): void {
        this.config.maxFiles = this.config.maxFiles ? 0 : 1;
    }

    public toggleClickAction(): void {
        this.config.clickable = !this.config.clickable;
    }

    public resetDropzoneUploads(): void {
        if (this.type === 'directive' && this.directiveRef) {
            this.directiveRef.reset();
        } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
            this.componentRef.directiveRef.reset();
        }
    }

    public onUploadInit(dropzone: any): void {
        console.log('onUploadInit:', dropzone);
    }

    public onUploadError(args: any): void {
        console.log('onUploadError:', args);
        this.resetDropzoneUploads();
        this.errors[0] = 'Un problème est survenu pendant l\'opération';

    }

    public onUploadSuccess([file, xhrResponse, progressEvent]: any): void {
        console.log('onUploadSuccess:', [file, xhrResponse, progressEvent]);

        this.imagesUploadedWithSuccess = [...this.imagesUploadedWithSuccess, xhrResponse];
        this.validatingForm.reset();
        this.resetDropzoneUploads();
        this.errors = [];
        this.toast.success('Votre image a été soumise et la qualité sera etudier avant d\'etre publier');
    }



    ngAfterViewInit () {
        if (this.type === 'directive' && this.directiveRef) {
            this.dropzone = this.directiveRef.dropzone();
        } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
            this.dropzone = this.componentRef.directiveRef.dropzone();
        }

        this.dropzone.on('sending',  (file, xhr, formData) => {
            // Will send the filesize along with the file as POST data.
            // console.log('sending:', file, xhr, formData);
            formData.append('user', JSON.stringify(this.user));

            const generatedKeyswords = (this.validatingForm.value['description'] || '').split(' ');

            for (const key in this.validatingForm.value) {
                formData.append(key, JSON.stringify( this.validatingForm.value[key]));
            }

            const tagsModelList = this.validatingForm.value['tags'];
            const keywords = tagsModelList.map(x => x).concat(generatedKeyswords).filter(x => x.length > 2);
            formData.append('keywords', JSON.stringify(keywords));

        });
    }

    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }
}
