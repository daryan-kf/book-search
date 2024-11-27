import axios from "axios";
import {jest} from "@jest/globals";
import {fetchBooks} from "../services/fetchBooks";
// Use the globally defined Book type
import {Book} from "@/types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchBooks", () => {
  it("should return books from Google Books API", async () => {
    // Mock Axios response
    mockedAxios.mockResolvedValue({
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

    const books: Book[] = await fetchBooks();

    expect(books.length).toEqual(1);
    expect(books[0]).toEqual<Book>({
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
