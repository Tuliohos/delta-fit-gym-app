const rewire = require("rewire")
const employeeList = rewire("./employeeList")
const EmployeeList = employeeList.__get__("EmployeeList")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new EmployeeList()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
