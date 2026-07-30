export interface ProductReleaseModel {

  id: string;

  name: string;

  barcode: string | null;

  releaseYear: number | null;

  packagingType: string | null;

  region: string | null;

  language: string | null;

  retailer: string | null;

  imageUrl: string | null;

  variant: {

    id: string;

    name: string;

    figure: {

      id: string;

      name: string;

      character: {

        id: string;

        name: string;

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