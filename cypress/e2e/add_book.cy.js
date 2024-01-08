const bookEntity1 = {
  title: "Book1 title",
  desc: "Book1 desc",
  authors: "Book1 author",
};

const bookEntity2 = {
  title: "Book2 title",
  desc: "Book2 desc",
  authors: "Book2 author",
};

describe("tests1", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookEntity1);
    cy.get(".card-title").should("contain.text", bookEntity1.title);
  });

  it("Should append book to favorites", () => {
    cy.contains(".card-title", bookEntity1.title)
      .parent()
      .parent()
      .within(() => cy.contains("Add to favorite").click());

    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookEntity1.title);
  });

  it("Should delete book from favorites", () => {
    cy.visit("/favorites");
    cy.contains(".card-title", bookEntity1.title)
      .parent()
      .parent()
      .within(() => cy.contains("Delete from favorite").click());
  });

  it("Should add new favorite book", () => {
    cy.addBook(bookEntity2, true);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookEntity2.title);
  });
});
