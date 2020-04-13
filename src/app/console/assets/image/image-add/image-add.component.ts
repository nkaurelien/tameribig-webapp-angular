import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/auth2/_services';
import {environment} from '@environments/environment';

@Component({
    selector: 'app-image-add',
    templateUrl: './image-add.component.html',
    styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit, AfterViewInit {

    @ViewChild('modal', {static: true}) modal: ModalDirective;

    @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;

    @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

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


    public dropzone: any;

    public errors = [];
    public imagesUploadedWithSuccess = [];

    public validatingForm: FormGroup;
    public user: any;


    get prixInput() {
        return this.validatingForm.get('price');
    }
    get titreInput() { return this.validatingForm.get('titre'); }
    get descInput() { return this.validatingForm.get('description'); }
    get tagsInput() { return this.validatingForm.get('tags'); }

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.validatingForm = new FormGroup({
            titre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            price: new FormControl(null, [Validators.required, Validators.min(50)]),
            description: new FormControl(null, [Validators.minLength(3), Validators.maxLength(100)]),
            tags: new FormControl(null, null),
        });

        this.auth.loggedIn$.subscribe(({loggedIn, routerState, user}) => {
            this.user = user;
        });
    }

    ngAfterViewInit() {
        this.modal.show();

        // Dropzone Init


        if (this.type === 'directive' && this.directiveRef) {
            this.dropzone = this.directiveRef.dropzone();
        } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
            this.dropzone = this.componentRef.directiveRef.dropzone();
        }

        this.dropzone.on('sending', (file, xhr, formData) => {
            // Will send the filesize along with the file as POST data.
            // console.log('sending:', file, xhr, formData);
            formData.append('user', JSON.stringify(this.user));

            const generatedKeyswords = (this.validatingForm.value['description'] || '').split(' ');

            for (const key in this.validatingForm.value) {
                formData.append(key, JSON.stringify(this.validatingForm.value[key]));
            }

            const keywordsModelList = this.validatingForm.value['keywords'];
            const keywords = keywordsModelList.map(x => x).concat(generatedKeyswords).filter(x => x.length > 2);
            formData.append('keywords', JSON.stringify(keywords));

        });
    }



    onHideModal() {
        this.router.navigateByUrl('/console/assets/images');
    }



    submit() {
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        if (this.validatingForm.valid) {
            this.dropzone.processQueue();
        } else {
            this.errors = ['Formulaire invalide'];
        }
    }

    public resetDropzoneUploads(): void {
        if (this.type === 'directive' && this.directiveRef) {
            this.directiveRef.reset();
        } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
            this.componentRef.directiveRef.reset();
        }
    }

    public onUploadInit(dropzone: any): void {
        // console.log('onUploadInit:', dropzone);
    }

    public onUploadError(args: any): void {
        // console.log('onUploadError:', args);
        this.resetDropzoneUploads();
        this.errors[0] = 'Un problème est survenu pendant l\'opération';

    }

    public onUploadSuccess([file, xhrResponse, progressEvent]: any): void {
        // console.log('onUploadSuccess:', [file, xhrResponse, progressEvent]);

        this.imagesUploadedWithSuccess = [...this.imagesUploadedWithSuccess, xhrResponse];
        this.validatingForm.reset();
        this.resetDropzoneUploads();
        this.errors = [];
        this.toast.success('Votre image a été soumise et la qualité sera etudier avant d\'etre publier');
    }


    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }

}
