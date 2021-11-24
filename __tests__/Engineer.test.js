const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    it("Can set GitHub account via constructor", () => {
        const testValue = "GitHubUser";
        const e = new Engineer("Foo", 1, "test@test.com", testValue);
        expect(e.github).toBe(testValue);
    });

    describe("getGithub", () => {
        it("Can get GitHub username via getGithub()", () => {
            const testValue = "GitHubUser";
            const e = new Engineer("Foo", 1, "test@test.com", testValue);
            expect(e.getGithub()).toBe(testValue);
        });
    });

    describe("getRole", () => {
        it("getRole() should return \"Engineer\"", () => {
            const testValue = "Engineer";
            const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser");
            expect(e.getRole()).toBe(testValue);
        });
    });

})