import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import mockAxios from "axios";

describe("Home.vue", () => {
  let wrapper;

  beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          data: [
            { problem: "mockProblem1", pk: 15 },
            { problem: "mockProblem2", pk: 30 }
          ]
        }
      })
    );

    wrapper = shallowMount(Home, {
      stubs: ["router-link", "router-view"]
    });

    window.alert = (jsdomAlert) => { console.log(jsdomAlert) };
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    expect(wrapper.html()).toContain("Welcome to Icky");
  });

  it("sets the correct default data", () => {
    expect(typeof Home.data).toBe('function')
    const defaultData = Home.data()
    expect(defaultData.problems).toMatchObject([])
  });

  it("loads problems from api", async () => {
    expect(wrapper.findAll("#problem").length).toBe(2);
  });
});