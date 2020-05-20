import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/auth2/_services';
import {environment} from '@environments/environment';
import {ImagesApiService} from '@app/main/@core/services/images-api.service';

@Component({
    selector: 'app-image-add',
    templateUrl: './image-add.component.html',
    styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit, AfterViewInit {

    @ViewChild('modal', {static: true}) modal: ModalDirective;

    public disabled = false;

    public submitting = false;

    public errors = [];
    public imagesUploadedWithSuccess = [];

    public validatingForm: FormGroup;
    public user: any;

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private imagesApiService: ImagesApiService,
        private toast: ToastService,
    ) { }

    get prixInput() {
        return this.validatingForm.get('price');
    }

    get titreInput() {
        return this.validatingForm.get('titre');
    }

    get descInput() {
        return this.validatingForm.get('description');
    }

    get tagsInput() {
        return this.validatingForm.get('keywords');
    }

    ngOnInit() {
        this.validatingForm = new FormGroup({
            title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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

    }



    onHideModal() {
        this.router.navigateByUrl('/console/assets/images');
    }



    submit() {
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        if (this.validatingForm.valid) {
            this.submitting = true;
            const body = {
                user: this.user,
                ...this.validatingForm.value,
            };
            this.imagesApiService.create(body).subscribe(resp => {
                this.submitting = false;
                this.validatingForm.reset();
                this.errors = [];
                this.toast.success('Enregistrer avec succès, recharger votre liste ');
                setTimeout(() => this.modal.hide(), 1200);

            }, err => {
                this.submitting = false;
            });
        } else {
            this.errors = ['Formulaire invalide'];
        }
    }


    getImageUrl(uid: string) {
        return `${environment.ApiBaseUrl}/images/open/${uid}`;
    }

}
