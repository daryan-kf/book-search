import axios from "axios";
import {jest} from "@jest/globals";
import {fetchBooks} from "../services/fetchBooks";

jest.mock("axios");

describe("fetchBooks", () => {
  it("should return books from Google Books API", async () => {
    // Mock Axios response
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        items: [
          {
            id: "11FVPgAACAAJ",
            volumeInfo: {
              title: "The Rachel Papers",
              authors: ["Martin Amis"],
              description:
                "On the eve of his twentieth birthday, Charles Highway reviews his campaign to win over a self-assured girl named Rachel.",
              categories: ["Black humor"],
              imageLinks: {
                thumbnail:
                  "http://books.google.com/books/content?id=11FVPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
              },
              publisher: "Vintage",
              publishedDate: "1992",
              pageCount: 0,
            },
          },
        ],
      },
    });

    const books: any[] = await fetchBooks();

    expect(books.length).toEqual(1);
    expect(books[0]).toEqual<any>({
      id: "11FVPgAACAAJ",
      title: "The Rachel Papers",
      authors: ["Martin Amis"],
      description:
        "On the eve of his twentieth birthday, Charles Highway reviews his campaign to win over a self-assured girl named Rachel.",
      categories: ["Black humor"],
      thumbnail:
        "http://books.google.com/books/content?id=11FVPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      publisher: "Vintage",
      publishedDate: "1992",
      pageCount: 0,
    });
  });
});
