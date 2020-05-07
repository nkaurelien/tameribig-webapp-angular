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

    @ViewChild('myPond', {static: true}) myPond: any;
    pondFiles = [];
    public disabled = false;
    public uploading = false;

    public errors = [];
    public imagesUploadedWithSuccess = [];

    private user: any;
    private paramMapSub: Subscription;
    private ID: string;

    /**
     * @see https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
     * @see https://codepen.io/rikschennink/pen/NzRvbj
     */
    pondOptions = {
        maxFiles: 1,
        class: 'my-filepond',
        multiple: false,
        // name: 'filepond',
        labelIdle: 'Glisser votre couverture d\'image ici ou <span class="filepond--label-action"> Choisir </span>',
        // acceptedFileTypes: 'image/jpeg, image/png',
        // acceptedFileTypes: 'application/tar+gzip,application/x-photoshop,application/octet-stream,image/vnd.adobe.photoshop',
        acceptedFileTypes: 'application/zip,application/x-zip-compressed,application/x-7z-compressed,application/tar+gzip',

        required: true,

        allowDrop: true,
        allowMultiple: false,
        allowBrowse: true,
        allowReplace: false,
        allowRevert: false,
        instantUpload: false,
        allowFileEncode: true,
        allowImagePreview: false,
        server: {
            url: `${environment.ApiBaseUrl}/images/upload-archive`,
            timeout: 7000,
            revert: null,
            restore: null,
            load: null,
            fetch: null,
            process: (fieldName, file, metadata, load, error, progress, abort) => {

                const formData = new FormData();
                this.uploading = true;

                formData.append('id', this.ID);
                formData.append('file', file);
                formData.append('user', JSON.stringify(this.user));

                const request = new XMLHttpRequest();
                request.open('POST', this.pondOptions.server.url);

                // Should call the progress method to update the progress to 100% before calling load
                // Setting computable to false switches the loading indicator to infinite mode
                request.upload.onprogress = (e) => {
                    progress(e.lengthComputable, e.loaded, e.total);
                };

                // Should call the load method when done and pass the returned server file id
                // this server file id is then used later on when reverting or restoring a file
                // so your server knows which file to return without exposing that info to the client
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        // the load method accepts either a string (id) or an object
                        load(request.responseText);
                    } else {
                        // Can call the error method if something is wrong, should exit after
                        error('oh no');
                    }
                    this.uploading = false;
                };
                request.send(formData);
                // Should expose an abort method so the request can be cancelled
                return {
                    abort: () => {
                        this.myPond.removeFiles();
                        this.errors = ['Erreur de téléchargement'];
                        // Let FilePond know the request has been cancelled
                        abort();
                        this.uploading = false;
                    },
                };
            },
        },
    };

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

    }


    pondHandleInit() {
        console.log('FilePond has initialised', this.myPond);
    }

    pondHandleAddFile(event: any) {
        console.log('A file was added', event);
    }

    redirectToImagesIndex() {
        this.router.navigateByUrl('/console/assets/images');
    }

    onHideModal() {
        this.redirectToImagesIndex();
    }

    submit() {
        console.log('begin', (new Date()).toISOString());
        this.uploading = true;
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        this.myPond.processFile().then(file => {
        }).finally(() => {
            this.uploading = false;
            console.log('end', (new Date()).toISOString());

        });
    }


    public resetUploads(): void {
        this.myPond.removeFiles();
    }

    public onUploadError(args: any): void {
        console.log('onUploadError:', args);
        this.resetUploads();
        this.errors[0] = [
            'Un problème est survenu pendant l\'opération',
            '<small>' + args.error.main + '</small>',
        ].join('<br>');
        this.uploading = false;
    }

    public onUploadSuccess([file, xhrResponse, progressEvent]: any): void {
        // console.log('onUploadSuccess:', [file, xhrResponse, progressEvent]);

        this.uploading = false;
        this.imagesUploadedWithSuccess = [...this.imagesUploadedWithSuccess, xhrResponse];
        this.resetUploads();
        this.errors = [];
        this.toast.success('Votre image a été soumise et la qualité sera etudier avant d\'etre publier');
        setTimeout(() => this.modal.hide(), 2000);
    }


    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }

}
