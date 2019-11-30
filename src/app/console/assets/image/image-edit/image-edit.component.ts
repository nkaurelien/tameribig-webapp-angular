import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbCheckboxChange, ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@app/auth2/_services';
import {Subscription} from 'rxjs';
import {Image, ImagesApiService} from '@app/main/@core/services/images-api.service';
import {Categorie, CategoriesApiService} from '@app/main/@core/services/categories-api.service';
import {remove, uniq} from 'lodash';

@Component({
    selector: 'app-image-edit',
    templateUrl: './image-edit.component.html',
    styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modal', {static: true}) modal: ModalDirective;

    public errors = [];
    public topics: Categorie[] = [];
    public selectedTopics: Categorie[] = [];
    public image: Image;
    public submitting = false;
    public loading = false;
    private validatingForm: FormGroup;
    private user: any;
    private paramMapSub: Subscription;
    private ID: string;
    private updateImagebyIdSub: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthenticationService,
        private imagesApiService: ImagesApiService,
        private categoriesApiService: CategoriesApiService,
        private toast: ToastService,
    ) {
    }

    get prixInput() {
        return this.validatingForm.get('price');
    }

    get titreInput() {
        return this.validatingForm.get('titre');
    }

    get descInput() {
        return this.validatingForm.get('description');
    }

    get keywordsInput() {
        return this.validatingForm.get('keywords');
    }

    ngOnInit() {
        this.selectedTopics = [];
        this.validatingForm = new FormGroup({
            titre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            price: new FormControl(null, [Validators.required, Validators.min(50)]),
            description: new FormControl(null, [Validators.minLength(3), Validators.maxLength(100)]),
            keywords: new FormControl(null, null),
        });

        this.auth.loggedIn$.subscribe(({loggedIn, routerState, user}) => {
            this.user = user;
        });

        this.paramMapSub = this.route.paramMap.subscribe(params => {
            this.ID = params.get('id');

            if (!this.image) {
                this.loading = true;
                this.loadTopics();
                this.loadItem();

            }
        });
    }

    loadItem() {
        this.imagesApiService.findOneById(this.ID).subscribe(resp => {
            console.log('image', resp);
            this.image = resp;
            this.loading = false;
            this.selectedTopics = uniq([...resp.topics || [], ...this.selectedTopics]);
            this.keywordsInput.setValue(this.image.keywords);
            this.titreInput.setValue(this.image.title);
            this.descInput.setValue(this.image.description);
            this.prixInput.setValue(this.image.price);
        }, err => {
            this.loading = false;
        });
    }

    loadTopics() {
        this.categoriesApiService.getAll().subscribe(resp => {
            // console.log('topics', resp);
            this.topics = resp;
        });
    }

    ngOnDestroy(): void {
        if (this.paramMapSub) {
            this.paramMapSub.unsubscribe();
        }
        if (this.updateImagebyIdSub) {
            this.updateImagebyIdSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.modal.show();
    }


    submit() {
        // console.log('this.validatingForm.valid', this.validatingForm.valid, this.validatingForm.value);
        if (this.validatingForm.valid) {
            this.submitting = true;
            const body = {
                ...this.validatingForm.value,
                topics: this.selectedTopics.map(T => T.name),
            };
            this.updateImagebyIdSub = this.imagesApiService.updateOneById(this.ID, body).subscribe(resp => {
                this.submitting = false;
                // console.log('image updated', resp);
                this.image = {
                    ...this.image, ...resp
                };

                this.selectedTopics = [];
                this.toast.success('Enregistrer avec succès');
                setTimeout(() => this.modal.hide(), 1200);

            }, err => {
                this.submitting = false;
            });
        } else {
            this.errors = ['Formulaire invalide'];
        }
    }


    redirectToImagesIndex() {
        this.router.navigateByUrl('/console/assets/images');
    }

    onHideModal() {
        this.redirectToImagesIndex();
    }


    selectTopic($event: MdbCheckboxChange, item: any) {

        if ($event.checked) {
            this.selectedTopics.push(item);
        } else {
            remove(this.selectedTopics, (T: any) => {
                return T.id === item.id;
            });
        }

    }

    trackByID(index, item) {
        if (!item) {
            return null;
        }
        return item._id;
    }

}
