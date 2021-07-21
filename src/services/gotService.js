export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResourse (url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResourse("/characters?page=20&pageSize=10");
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const char = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    async getAllHouses() {
        return this.getResourse("/houses/");
    }
    async getHouse(id) {
        return this.getResourse(`/houses/${id}`);
    }

    async getAllBooks() {
        return this.getResourse("/books/");
    }
    async getBook(id) {
        return this.getResourse(`/books/${id}`);
    }  

    isSet(data) {
        if (data) {
            return data;
        } else {
            return 'no data :(';
        }
    }

    _transformCharacter = (char) => {
        console.log(char);
        return {
            id: char.url.match(/\d+$/)[0],
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}

