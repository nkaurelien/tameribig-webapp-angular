import * as faker from 'faker';

export const generateDummyCategorieMocks = function ( size: number) {

    let items = [];
    let i;
    for ( i = 0; i < size; i++) {

        const price = faker.finance.amount(1000, 5000, null, null);
        const priceHuman = `${price} XAF`;

        items = [

            ...items,
            {
              uid: faker.random.uuid(),
              name : faker.random.word(),
              class : 'hexa',
              subclass : 'hexagon hexagon' + i,
              libelle : faker.random.word(),
              picture: faker.image.imageUrl(1200),

            },
        ];
    }

    return items;
};

export const dummyCategoriesMocks = [{
  name : 'Mate Painting',
  class : 'hexa',
  subclass : 'hexagon hexagon1',
  libelle : 'libelle'
},
  {
    name : 'Dessin',
    class : 'hexa',
    subclass : 'hexagon hexagon2',
    libelle : 'libelle'
  },
  {
    name : 'Illustration',
    class : 'hexa',
    subclass : 'hexagon hexagon3',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon4',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon5',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon6',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon7',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon8',
    libelle : 'libelle'
  },
  {
    name : 'Dessin',
    class : 'hexa',
    subclass : 'hexagon hexagon2',
    libelle : 'libelle'
  },
  {
    name : 'Illustration',
    class : 'hexa',
    subclass : 'hexagon hexagon3',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon4',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon5',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon6',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon7',
    libelle : 'libelle'
  },
  {
    name : 'Digital painting',
    class : 'hexa',
    subclass : 'hexagon hexagon8',
    libelle : 'libelle'
  }
];
