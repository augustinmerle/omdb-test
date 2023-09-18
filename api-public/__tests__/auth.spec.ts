import {checkLogin} from "../src/services/auth";

 beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore

})
describe('Login test', () => {

    it('Test checkLogin function', async () => {
        await expect(checkLogin("john_doe", "jojom")).resolves.toBeTruthy();
        await expect(checkLogin("john_doe", "1234")).resolves.toBeFalsy();
      //  expect(checkLogin(null, null)).toBeFalsy();
    })
})
