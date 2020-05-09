export default {
  get: jest.fn(call => {
    console.log("GET API call: " + call);
    Promise.resolve({ data: {} });
  }),
  put: jest.fn(call => {
    console.log("PUT API call: " + call);
    Promise.resolve({ data: {} });
  }),
  delete: jest.fn(call => {
    console.log("DELETE API call: " + call);
    Promise.resolve({ data: {} });
  })
};
