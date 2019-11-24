import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '@environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private meta: Meta, private title: Title) { }

    generateTags(config: TagConfig|any) {
        // default values
        config = {
            title: "Tameri Big, la toile d'inbiration",
            description: "L'afrique a des talents",
            keywords: "partage image, partage photo, partage video, partage illustration, partage creation, culture africaine, inspiration africaine, made in black",
            image: `${document.location.origin}/${environment.logo}`,
            slug: '',
            ...config
        };

        // console.log(config);


        // APP
        this.title.setTitle(config.title);
        this.meta.updateTag({ name: 'description', content: config.description});
        this.meta.updateTag({ name: 'keywords', content: config.keywords});


        // Twitter
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: '@@tameribig' });
        this.meta.updateTag({ name: 'twitter:title', content: config.title });
        this.meta.updateTag({ name: 'twitter:description', content: config.description });
        this.meta.updateTag({ name: 'twitter:image', content: config.image });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'tameribig' });
        this.meta.updateTag({ property: 'og:title', content: config.title });
        this.meta.updateTag({ property: 'og:description', content: config.description });
        this.meta.updateTag({ property: 'og:image', content: config.image });
        this.meta.updateTag({ property: 'og:url', content: `${document.location.origin}/${config.slug}` });
    }

}

export interface TagConfig {
    title: string;
    description?: string;
    image?: string;
    slug?: string;
    keywords?: string;
}