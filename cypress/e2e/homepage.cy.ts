describe("user not log in in homepage", () => {
  it("Visits all the nav bar", () => {
    cy.visit("http://localhost:3002/");
    cy.contains("Reviews").click();
    cy.url().should("eq", "http://localhost:3002/reviews");
    cy.contains("Services").click();
    cy.url().should("eq", "http://localhost:3002/services");
    cy.contains("Cleaner").click();
    cy.url().should("eq", "http://localhost:3002/cleanersignup");
    cy.contains("Sign Up").click();
    cy.url().should("eq", "http://localhost:3002/signup");
    cy.contains("Login").click();
    cy.url().should("eq", "http://localhost:3002/login");
    cy.contains("a", "Home").click();
    cy.url().should("eq", "http://localhost:3002/");
  });

  it("Check all link in Home page", () => {
    cy.visit("http://localhost:3002/");
    cy.contains("Schedule your cleaner").click();
    cy.url().should("eq", "http://localhost:3002/signup");
    cy.go("back");
    cy.get("li").contains("a", "Services").click();
    cy.url().should("eq", "http://localhost:3002/services");
  });
});





