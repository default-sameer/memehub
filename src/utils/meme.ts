
export interface Data {
    memes: Meme[];
}

export interface Meme {
    id:        string;
    name:      string;
    url:       string;
    width:     number;
    height:    number;
    box_count: number;
}


export interface MemeResponse {
    id:       string;
    imageUrl: string;
    nsfw:     boolean;
    likes:    number;
    createdAt: string;
    author:{
        name: string;
        email?: string;
        image: string;
    }
}
