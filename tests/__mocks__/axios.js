const problem = {
    problem: "MOCK RESPONSE",
    pk: "15" 
}

export default {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} }))
};