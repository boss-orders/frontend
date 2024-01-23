describe("ログインテスト", () => {
  it("全て空欄でログインした場合", () => {
    cy.visit("/login");
    cy.get("button").click();
    cy.get("#error-name").should("be.visible");
    cy.get("#error-pass").should("be.visible");
  });

  it("間違ったパスワードを入力した場合", () => {
    cy.visit("/login");
    cy.get("#name").type("test");
    cy.get("#password").type("aaaa");
    cy.get("button").click();
    cy.get("#alert").should("be.visible");
  });

  it("間違った名前を入力した場合", () => {
    cy.visit("/login");
    cy.get("#name").type("aaa");
    cy.get("#password").type("hogehoge");
    cy.get("button").click();
    cy.get("#alert").should("be.visible");
  });

  it("正しい情報を入力した場合", () => {
    cy.visit("/login");
    cy.get("#name").type("test");
    cy.get("#password").type("hogehoge");
    cy.get("button").click();
    cy.url().should("include", "/");
  });
});
