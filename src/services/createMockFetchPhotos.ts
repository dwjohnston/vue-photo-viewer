import type { fetchPhotos, Photo } from "./fetchPhotos";


// ☝️ This function can be extended as mocking needs change. 
export function createMockFetchPhotos() : typeof fetchPhotos {

    const mockData : Record<string, Array<Photo>> = {
        foo: [{
            "id": 2097616,
            "width": 2987,
            "height": 3982,
            "url": "https://www.pexels.com/photo/aerial-shot-of-city-2097616/",
            "photographer": "Tiff Ng",
            "photographer_url": "https://www.pexels.com/@anytiffng",
            "photographer_id": 1104635,
            "avg_color": "#97A0A5",
            "src": {
              "original": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg",
              "large2x": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "large": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              "medium": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&h=350",
              "small": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&h=130",
              "portrait": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
              "landscape": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
              "tiny": "https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
            },
            "liked": false,
            "alt": "Breathtaking aerial view of Melbourne skyline along the Yarra River with lush greenery."
          },
          {
            "id": 3626248,
            "width": 5906,
            "height": 3937,
            "url": "https://www.pexels.com/photo/park-near-modern-building-during-daylight-3626248/",
            "photographer": "Felix Haumann",
            "photographer_url": "https://www.pexels.com/@felix-haumann-1938529",
            "photographer_id": 1938529,
            "avg_color": "#656A66",
            "src": {
              "original": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg",
              "large2x": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "large": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
              "medium": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&h=350",
              "small": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&h=130",
              "portrait": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
              "landscape": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
              "tiny": "https://images.pexels.com/photos/3626248/pexels-photo-3626248.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
            },
            "liked": false,
            "alt": "Stunning daytime view of Melbourne's modern skyline with high-rise buildings and lush greenery."
          }], 
        bar: [
            {
                "id": 622038,
                "width": 4000,
                "height": 6000,
                "url": "https://www.pexels.com/photo/bird-s-eyeview-photography-of-city-landscape-622038/",
                "photographer": "Aditya  Banerjee",
                "photographer_url": "https://www.pexels.com/@aditya-banerjee-180575",
                "photographer_id": 180575,
                "avg_color": "#304164",
                "src": {
                  "original": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg",
                  "large2x": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  "large": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                  "medium": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "small": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&h=130",
                  "portrait": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                  "landscape": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                  "tiny": "https://images.pexels.com/photos/622038/pexels-photo-622038.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                },
                "liked": false,
                "alt": "Stunning twilight view of Melbourne's cityscape featuring illuminated skyscrapers and the Yarra River."
              }
        ], 
        food: [
            {
                "id": 68704,
                "width": 5184,
                "height": 3324,
                "url": "https://www.pexels.com/photo/australia-map-68704/",
                "photographer": "Catarina Sousa",
                "photographer_url": "https://www.pexels.com/@catarina-sousa-9147",
                "photographer_id": 9147,
                "avg_color": "#A09B7E",
                "src": {
                  "original": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg",
                  "large2x": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  "large": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                  "medium": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "small": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&h=130",
                  "portrait": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                  "landscape": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                  "tiny": "https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                },
                "liked": false,
                "alt": "Close-up of a map of Australia with colorful pins marking various cities and destinations."
              }
        ],
    }

    return async (query: string) => {
        
        const keys = Object.keys(mockData);; 
        const relevantKeys = keys.filter((key) => key.includes(query));
        const releventPhotos = relevantKeys.flatMap((v) => mockData[v]);

        return {
            page: 1,
            per_page: 10,
            photos: releventPhotos,
            total_results: releventPhotos.length,
        } as const;         
    };
}