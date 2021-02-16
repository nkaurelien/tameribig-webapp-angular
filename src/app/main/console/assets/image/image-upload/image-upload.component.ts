import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/auth2/_services';
import {environment} from '@environments/environment';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, AfterViewInit {

    @ViewChild('modal', {static: true}) modal: ModalDirective;

    @ViewChild('myPond', {static: true}) myPond: any;
    pondFiles = [];
    public disabled = false;
    public errors = [];
    public imagesUploadedWithSuccess = [];
    public validatingForm: FormGroup;
    public user: any;
    pondOptions = {
        maxFiles: 1,
        class: 'my-filepond',
        multiple: false,
        // name: 'filepond',
        labelIdle: 'Glisser votre couverture d\'image ici ou <span class="filepond--label-action"> Choisir </span>',
        acceptedFileTypes: 'image/jpeg, image/png',

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
            url: `${environment.ApiBaseUrl}/images/upload-picture`,
            timeout: 7000,
            revert: null,
            restore: null,
            load: null,
            fetch: null,
            process: (fieldName, file, metadata, load, error, progress, abort) => {

                if (!this.validatingForm.valid) {
                    this.errors = ['Formulaire invalide'];
                    return {
                        abort: () => {
                            this.myPond.removeFiles();
                            // Let FilePond know the request has been cancelled
                            abort();
                        },
                    };
                }
                const formData = new FormData();
                formData.append('user', JSON.stringify(this.user));

                const generatedKeyswords = (this.validatingForm.value.description || '').split(' ');

                for (const key in this.validatingForm.value) {
                    if (this.validatingForm.value.hasOwnProperty(key)) {
                        formData.append(key, JSON.stringify(this.validatingForm.value[key]));
                    }
                }

                console.log(this.validatingForm.value);
                const keywordsModelList = this.validatingForm.value.keywords || [];
                const keywords = keywordsModelList.map(x => x).concat(generatedKeyswords).filter(x => x.length > 2);
                formData.append('keywords', JSON.stringify(keywords));


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
                };
                request.send(formData);
                // Should expose an abort method so the request can be cancelled
                return {
                    abort: () => {
                        this.myPond.removeFiles();
                        this.errors = ['Erreur de téléchargement'];
                        // Let FilePond know the request has been cancelled
                        abort();
                    },
                };
            },
        },
    };

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private toast: ToastService,
    ) {
    }

    get titreInput() {
        return this.validatingForm.get('titre');
    }

    get prixInput() {
        return this.validatingForm.get('price');
    }

    get descInput() {
        return this.validatingForm.get('description');
    }

    get tagsInput() {
        return this.validatingForm.get('keywords');
    }

    ngOnInit() {
        this.validatingForm = new FormGroup({
            titre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            price: new FormControl(null, [Validators.required, Validators.min(50)]),
            description: new FormControl(null, [Validators.minLength(3), Validators.maxLength(100)]),
            keywords: new FormControl(null, null),
        });

        this.auth.loggedIn$.subscribe(({loggedIn, routerState, user}) => {
            this.user = user;
        });
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

    onHideModal() {
        this.router.navigateByUrl('/console/assets/images');
    }


    submit() {
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        if (this.validatingForm.valid) {

            this.myPond.processFile().then(file => {
            });

        } else {
            this.errors = ['Formulaire invalide'];
        }
    }

    public resetUploads(): void {
        this.myPond.removeFiles();
    }

    public onUploadError(args: any): void {
        console.log('onUploadError:', args);
        this.resetUploads();
        this.errors[0] = 'Un problème est survenu pendant l\'opération';

    }

    public onUploadSuccess([file, xhrResponse, progressEvent]: any): void {
        // console.log('onUploadSuccess:', [file, xhrResponse, progressEvent]);

        this.imagesUploadedWithSuccess = [...this.imagesUploadedWithSuccess, xhrResponse];
        this.validatingForm.reset();
        this.resetUploads();
        this.errors = [];
        this.toast.success('Votre image a été soumise et la qualité sera etudier avant d\'etre publier');
    }


    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }

}
