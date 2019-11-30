import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@app/auth2/_services';
import {environment} from '@environments/environment';

@Component({
    selector: 'app-image-upload-source-component',
    templateUrl: './image-upload-source.component.html',
    styleUrls: ['./image-upload-source.component.scss']
})
export class ImageUploadSourceComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('modal', {static: true}) modal: ModalDirective;

    @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;

    @ViewChild(DropzoneDirective, {static: false}) directiveRef?: DropzoneDirective;

    public type = 'directive';
    public disabled = false;
    public uploading = false;
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

    private user: any;
    private paramMapSub: Subscription;
    private ID: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthenticationService,
        private toast: ToastService,
    ) {
    }

    ngOnInit() {
        this.auth.loggedIn$.subscribe(({loggedIn, routerState, user}) => {
            this.user = user;
        });

        this.paramMapSub = this.route.paramMap.subscribe(params => {
            this.ID = params.get('id');
        });

    }

    ngOnDestroy(): void {
        if (this.paramMapSub) {
            this.paramMapSub.unsubscribe();
        }
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
            this.uploading = true;
            // Will send the filesize along with the file as POST data.
            // console.log('sending:', file, xhr, formData);
            formData.append('id', this.ID);
            formData.append('user', JSON.stringify(this.user));


        });
    }

    redirectToImagesIndex() {
        this.router.navigateByUrl('/console/assets/images');
    }

    onHideModal() {
        this.redirectToImagesIndex();
    }

    submit() {
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        this.dropzone.processQueue();
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
        this.uploading = false;

    }

    public onUploadSuccess([file, xhrResponse, progressEvent]: any): void {
        // console.log('onUploadSuccess:', [file, xhrResponse, progressEvent]);
        this.uploading = false;
        this.imagesUploadedWithSuccess = [...this.imagesUploadedWithSuccess, xhrResponse];
        this.resetDropzoneUploads();
        this.errors = [];
        this.toast.success('Votre image a été soumise et la qualité sera etudier avant d\'etre publier');
        setTimeout(() => this.modal.hide(), 2000);
    }


    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }

}
