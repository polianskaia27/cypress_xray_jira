import "../support/commands.js";
import { faker } from "@faker-js/faker";
const title = faker.word.noun(12);
const text = faker.lorem.words({ min: 1, max: 3 });
const answer = faker.lorem.words({ min: 1, max: 3 });

beforeEach(() => {
  cy.authorization();
});

describe("Post and edit tasks", () => {
  it("Post a new task", () => {
    cy.postNewTask(title, text, answer).then((response) => {
      expect(response.statusText).to.equal("Created");
      expect(response.headers["content-type"]).to.equal("application/json");
      expect(response.body.id).to.exist;
      expect(response.body.text).to.exist;
      expect(response.body.answer).to.exist;
      expect(response.body.title).to.exist;
    });
  });

  it("Edit the task", () => {
    cy.postNewTask(title, text, answer).then(() => {
      cy.editTheTask(Cypress.env("taskId"), text, answer, title).then(
        (response) => {
          expect(response.statusText).to.equal("OK");
          expect(response.headers["content-type"]).to.equal("application/json");
          expect(response.body.id).to.exist;
          expect(response.body.text).to.equal(text);
          expect(response.body.answer).to.equal(answer);
        }
      );
    });
  });

  afterEach(() => {
    cy.deleteTheTask();
  });
});

describe("Delete task", () => {
  it("Delete the task", () => {
    cy.postNewTask(title, text, answer).then(() => {
      cy.deleteTheTask().then((response) => {
        expect(response.statusText).to.equal("No Content");
        expect(response.headers["content-length"]).to.equal("0");
      });
    });
  });
});
