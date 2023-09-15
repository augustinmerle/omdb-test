import {checkLogin, user} from "../src/services/auth";

 beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore

})
describe('Login test', () => {

    it('Test checkLogin function', () => {
        expect(checkLogin("john_doe", "jojom")).toBeTruthy();
        expect(checkLogin("john_doe", "1234")).toBeFalsy();
      //  expect(checkLogin(null, null)).toBeFalsy();
    })
})
