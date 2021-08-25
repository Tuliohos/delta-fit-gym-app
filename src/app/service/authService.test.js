const authService = require("./authService")
// @ponicode
describe("authService.default.isAuthenticatedUser", () => {
    test("0", () => {
        let callFunction = () => {
            authService.default.isAuthenticatedUser()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("authService.default.logIn", () => {
    test("0", () => {
        let callFunction = () => {
            authService.default.logIn("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            authService.default.logIn("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            authService.default.logIn("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            authService.default.logIn("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            authService.default.logIn("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            authService.default.logIn(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("authService.default.getAuthenticatedUser", () => {
    test("0", () => {
        let callFunction = () => {
            authService.default.getAuthenticatedUser()
        }
    
        expect(callFunction).not.toThrow()
    })
})
