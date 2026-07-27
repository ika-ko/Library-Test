
let authors = [
    {
        id: 1,
        name: "J.R.R. Tolkien",
        bio: "English writer, poet, and academic best known for high fantasy classics.",
        bornYear: 1892
    },
    {
        id: 2,
        name: "George R.R. Martin",
        bio: "American novelist and screenwriter best known for epic fantasy series.",
        bornYear: 1948
    },
    {
        id: 3,
        name: "Agatha Christie",
        bio: "English writer known for 66 detective novels and short story collections.",
        bornYear: 1890
    },
    {
        id: 4,
        name: "Frank Herbert",
        bio: "American science fiction author best known for the novel Dune.",
        bornYear: 1920
    }
];
let nextAuthorId = 5;   
function getNextAuthorId() { return nextAuthorId++; }
let books = [
    {
        id: 101,
        title: "The Hobbit",
        genre: "Fantasy",
        publishedYear: 1937,
        authorId: 1
    },
    {
        id: 102,
        title: "The Fellowship of the Ring",
        genre: "Fantasy",
        publishedYear: 1954,
        authorId: 1
    },
    {
        id: 103,
        title: "A Game of Thrones",
        genre: "Fantasy",
        publishedYear: 1996,
        authorId: 2
    },
    {
        id: 104,
        title: "A Clash of Kings",
        genre: "Fantasy",
        publishedYear: 1998,
        authorId: 2
    },
    {
        id: 105,
        title: "And Then There Were None",
        genre: "Mystery",
        publishedYear: 1939,
        authorId: 3
    },
    {
        id: 106,
        title: "Murder on the Orient Express",
        genre: "Mystery",
        publishedYear: 1934,
        authorId: 3
    },
    {
        id: 107,
        title: "Dune",
        genre: "Sci-Fi",
        publishedYear: 1965,
        authorId: 4
    }
];
let nextBookId = 108;   
function getNextBookId() { return nextBookId++; }

module.exports = { authors, books,getNextAuthorId,getNextBookId };