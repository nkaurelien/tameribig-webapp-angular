import * as faker from 'faker';

export const generateDummyPicturesMocks = function ( size: number) {

    let images = [];
    let i;
    for ( i = 0; i < size; i++) {

        const price = faker.finance.amount(1000, 5000, null, null);
        const priceHuman = `${price} XAF`;

        images = [

            ...images,

            {
                uid: faker.random.uuid(),
                picture: faker.image.imageUrl(1200),
                miniature: faker.image.imageUrl(420),
                description:  faker.lorem.paragraph(3),
                price,
                priceHuman,
                author: {
                    fullname: faker.internet.userName('aurelien', 'nkumbe'),
                    email:  faker.internet.email('aurelien', 'nkumbe'),
                    social: 'https://www.facebook.com/nkumbeaurelien',
                    avatar: faker.image.avatar(),
                },
                sizes: {
                    sm: {
                        size: '576px 72dpi',
                        downloadUrl: '',
                    },
                    md: {
                        size: '768px 72dpi',
                        downloadUrl: ''
                    },
                    lg: {
                        size: '992px 72dpi',
                        downloadUrl: ''
                    },
                    xl: {
                        size: '1200px 72dpi',
                        downloadUrl: ''
                    }
                }
            }];
    }

    return images;
}

export const dummyPicturesMocks = [

    {
        picture: 'https://source.unsplash.com/530x572/?Jamaica',
        miniature: 'https://source.unsplash.com/530x572/?Jamaica',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',
        uid: '1201741894854163198df96',
    },
    {
        picture: 'https://source.unsplash.com/531x430/?Kuwait',
        miniature: 'https://source.unsplash.com/531x430/?Kuwait',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',
        uid: '12017418948541631984862',
    },
    {
        picture: 'https://source.unsplash.com/586x1073/?Bermuda',
        miniature: 'https://source.unsplash.com/586x1073/?Bermuda',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',
        uid: '120174189485416319844sd',

    },
    {
        picture: 'https://source.unsplash.com/500x571/?Ecuador',
        miniature: 'https://source.unsplash.com/500x571/?Ecuador',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',
        uid: '1201741894854163klskdls6',

    },
    {
        picture: 'https://source.unsplash.com/579x518/?Virgin Islands (British)',
        miniature: 'https://source.unsplash.com/579x518/?Virgin Islands (British)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',
        uid: '12017sdsdsezz41631984896',

    },
    {
        picture: 'https://source.unsplash.com/503x548/?Angola',
        miniature: 'https://source.unsplash.com/503x548/?Angola',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/511x630/?Mauritania',
        miniature: 'https://source.unsplash.com/511x630/?Mauritania',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/414x767/?Sri Lanka',
        miniature: 'https://source.unsplash.com/414x767/?Sri Lanka',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/443x704/?St. Helena',
        miniature: 'https://source.unsplash.com/443x704/?St. Helena',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/441x1145/?Namibia',
        miniature: 'https://source.unsplash.com/441x1145/?Namibia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/491x1097/?Samoa',
        miniature: 'https://source.unsplash.com/491x1097/?Samoa',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/570x851/?Eritrea',
        miniature: 'https://source.unsplash.com/570x851/?Eritrea',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/560x1072/?Iraq',
        miniature: 'https://source.unsplash.com/560x1072/?Iraq',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/551x598/?Togo',
        miniature: 'https://source.unsplash.com/551x598/?Togo',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/518x813/?Romania',
        miniature: 'https://source.unsplash.com/518x813/?Romania',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/497x524/?Kenya',
        miniature: 'https://source.unsplash.com/497x524/?Kenya',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/549x826/?Martinique',
        miniature: 'https://source.unsplash.com/549x826/?Martinique',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/559x627/?Tokelau',
        miniature: 'https://source.unsplash.com/559x627/?Tokelau',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/594x513/?Belize',
        miniature: 'https://source.unsplash.com/594x513/?Belize',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/480x1181/?Virgin Islands (US)',
        miniature: 'https://source.unsplash.com/480x1181/?Virgin Islands (US)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/526x552/?Chile',
        miniature: 'https://source.unsplash.com/526x552/?Chile',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/427x504/?Western Sahara',
        miniature: 'https://source.unsplash.com/427x504/?Western Sahara',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/468x971/?St. Pierre and Miquelon',
        miniature: 'https://source.unsplash.com/468x971/?St. Pierre and Miquelon',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/419x790/?Thailand',
        miniature: 'https://source.unsplash.com/419x790/?Thailand',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/417x1125/?Myanmar',
        miniature: 'https://source.unsplash.com/417x1125/?Myanmar',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/480x632/?Cocos (Keeling Islands)',
        miniature: 'https://source.unsplash.com/480x632/?Cocos (Keeling Islands)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/416x900/?Belarus',
        miniature: 'https://source.unsplash.com/416x900/?Belarus',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/408x837/?Panama',
        miniature: 'https://source.unsplash.com/408x837/?Panama',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/541x1021/?Slovak Republic',
        miniature: 'https://source.unsplash.com/541x1021/?Slovak Republic',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/597x1107/?Malta',
        miniature: 'https://source.unsplash.com/597x1107/?Malta',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/487x842/?Bahrain',
        miniature: 'https://source.unsplash.com/487x842/?Bahrain',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/403x904/?Somalia',
        miniature: 'https://source.unsplash.com/403x904/?Somalia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/544x515/?Morocco',
        miniature: 'https://source.unsplash.com/544x515/?Morocco',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/577x1044/?Djibouti',
        miniature: 'https://source.unsplash.com/577x1044/?Djibouti',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/404x437/?France, Metropolitan',
        miniature: 'https://source.unsplash.com/404x437/?France, Metropolitan',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/482x1079/?Libya',
        miniature: 'https://source.unsplash.com/482x1079/?Libya',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/473x887/?Bolivia',
        miniature: 'https://source.unsplash.com/473x887/?Bolivia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/583x614/?Kazakhstan',
        miniature: 'https://source.unsplash.com/583x614/?Kazakhstan',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/592x838/?Guyana',
        miniature: 'https://source.unsplash.com/592x838/?Guyana',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/422x731/?Switzerland',
        miniature: 'https://source.unsplash.com/422x731/?Switzerland',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/448x985/?Venezuela',
        miniature: 'https://source.unsplash.com/448x985/?Venezuela',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/494x936/?Uzbekistan',
        miniature: 'https://source.unsplash.com/494x936/?Uzbekistan',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/461x762/?Benin',
        miniature: 'https://source.unsplash.com/461x762/?Benin',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/550x676/?Palau',
        miniature: 'https://source.unsplash.com/550x676/?Palau',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/524x901/?Laos',
        miniature: 'https://source.unsplash.com/524x901/?Laos',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/594x1199/?French Southern Territories',
        miniature: 'https://source.unsplash.com/594x1199/?French Southern Territories',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/557x662/?Malawi',
        miniature: 'https://source.unsplash.com/557x662/?Malawi',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/428x1184/?Swaziland',
        miniature: 'https://source.unsplash.com/428x1184/?Swaziland',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/433x631/?Lithuania',
        miniature: 'https://source.unsplash.com/433x631/?Lithuania',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/523x477/?Sweden',
        miniature: 'https://source.unsplash.com/523x477/?Sweden',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/568x443/?Bahamas',
        miniature: 'https://source.unsplash.com/568x443/?Bahamas',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/434x448/?United Arab Emirates',
        miniature: 'https://source.unsplash.com/434x448/?United Arab Emirates',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/566x740/?Puerto Rico',
        miniature: 'https://source.unsplash.com/566x740/?Puerto Rico',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/481x580/?Nicaragua',
        miniature: 'https://source.unsplash.com/481x580/?Nicaragua',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/470x761/?Viet Nam',
        miniature: 'https://source.unsplash.com/470x761/?Viet Nam',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/519x954/?Australia',
        miniature: 'https://source.unsplash.com/519x954/?Australia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/405x1030/?Marshall Islands',
        miniature: 'https://source.unsplash.com/405x1030/?Marshall Islands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/587x1059/?Falkland Islands (Malvinas)',
        miniature: 'https://source.unsplash.com/587x1059/?Falkland Islands (Malvinas)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/593x907/?Montserrat',
        miniature: 'https://source.unsplash.com/593x907/?Montserrat',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/462x729/?British Indian Ocean Territory',
        miniature: 'https://source.unsplash.com/462x729/?British Indian Ocean Territory',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/538x610/?Norway',
        miniature: 'https://source.unsplash.com/538x610/?Norway',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/506x1057/?Malaysia',
        miniature: 'https://source.unsplash.com/506x1057/?Malaysia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/588x756/?Anguilla',
        miniature: 'https://source.unsplash.com/588x756/?Anguilla',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/468x1047/?Senegal',
        miniature: 'https://source.unsplash.com/468x1047/?Senegal',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/574x498/?Zaire',
        miniature: 'https://source.unsplash.com/574x498/?Zaire',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/594x635/?Ireland',
        miniature: 'https://source.unsplash.com/594x635/?Ireland',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/448x759/?Nauru',
        miniature: 'https://source.unsplash.com/448x759/?Nauru',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/540x619/?Mayotte',
        miniature: 'https://source.unsplash.com/540x619/?Mayotte',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/552x438/?Syria',
        miniature: 'https://source.unsplash.com/552x438/?Syria',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/563x759/?Ghana',
        miniature: 'https://source.unsplash.com/563x759/?Ghana',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/569x1171/?Austria',
        miniature: 'https://source.unsplash.com/569x1171/?Austria',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/581x657/?Macau',
        miniature: 'https://source.unsplash.com/581x657/?Macau',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/539x1013/?Mozambique',
        miniature: 'https://source.unsplash.com/539x1013/?Mozambique',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/581x477/?Liechtenstein',
        miniature: 'https://source.unsplash.com/581x477/?Liechtenstein',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/495x589/?Saint Vincent and The Grenadines',
        miniature: 'https://source.unsplash.com/495x589/?Saint Vincent and The Grenadines',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/579x680/?Brazil',
        miniature: 'https://source.unsplash.com/579x680/?Brazil',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/467x642/?Turks and Caicos Islands',
        miniature: 'https://source.unsplash.com/467x642/?Turks and Caicos Islands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/496x1186/?Italy',
        miniature: 'https://source.unsplash.com/496x1186/?Italy',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/416x844/?Reunion',
        miniature: 'https://source.unsplash.com/416x844/?Reunion',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/442x569/?Sierra Leone',
        miniature: 'https://source.unsplash.com/442x569/?Sierra Leone',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/517x1084/?Northern Mariana Islands',
        miniature: 'https://source.unsplash.com/517x1084/?Northern Mariana Islands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/431x1164/?Belgium',
        miniature: 'https://source.unsplash.com/431x1164/?Belgium',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/541x649/?Netherlands',
        miniature: 'https://source.unsplash.com/541x649/?Netherlands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/491x902/?Korea (South)',
        miniature: 'https://source.unsplash.com/491x902/?Korea (South)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/534x778/?Guinea',
        miniature: 'https://source.unsplash.com/534x778/?Guinea',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/528x933/?Tunisia',
        miniature: 'https://source.unsplash.com/528x933/?Tunisia',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/441x609/?Tonga',
        miniature: 'https://source.unsplash.com/441x609/?Tonga',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/469x1060/?Equatorial Guinea',
        miniature: 'https://source.unsplash.com/469x1060/?Equatorial Guinea',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/588x794/?S. Georgia and S. Sandwich Isls.',
        miniature: 'https://source.unsplash.com/588x794/?S. Georgia and S. Sandwich Isls.',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/536x1103/?Algeria',
        miniature: 'https://source.unsplash.com/536x1103/?Algeria',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/541x821/?Israel',
        miniature: 'https://source.unsplash.com/541x821/?Israel',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/414x541/?Bulgaria',
        miniature: 'https://source.unsplash.com/414x541/?Bulgaria',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/477x879/?Turkmenistan',
        miniature: 'https://source.unsplash.com/477x879/?Turkmenistan',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/450x777/?Croatia (Hrvatska)',
        miniature: 'https://source.unsplash.com/450x777/?Croatia (Hrvatska)',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/528x978/?Cook Islands',
        miniature: 'https://source.unsplash.com/528x978/?Cook Islands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/521x686/?Solomon Islands',
        miniature: 'https://source.unsplash.com/521x686/?Solomon Islands',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/550x432/?Bosnia and Herzegovina',
        miniature: 'https://source.unsplash.com/550x432/?Bosnia and Herzegovina',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/540x631/?Tanzania',
        miniature: 'https://source.unsplash.com/540x631/?Tanzania',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    },
    {
        picture: 'https://source.unsplash.com/594x443/?Chad',
        miniature: 'https://source.unsplash.com/594x443/?Chad',
        description: 'lorem',
        prix: '1000.0 XAF',
        auteur: 'Nkumbe aurelien',

    }
]

