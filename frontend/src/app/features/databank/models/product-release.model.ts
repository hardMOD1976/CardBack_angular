export interface ProductReleaseModel {

  id: string;

  name: string;

  barcode: string | null;

  releaseYear: number | null;

  releaseDate: string | null;

  packagingType: string | null;

  region: string | null;

  language: string | null;

  retailer: string | null;

  notes: string | null;

  imageUrl: string | null;

  variant: {

    id: string;

    name: string | null;

    figure: {

      id: string;

      name: string;
      code: string | null;
      imageUrl: string | null;

      character: {

        id: string;

        name: string;
        image: string | null;

      };

      line: {

        id: string;

        name: string;
        manufacturer: {

          id: string;

          name: string;

        };

      };

    };

  };

}
