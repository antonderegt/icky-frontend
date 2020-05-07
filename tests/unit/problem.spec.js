import { shallowMount } from "@vue/test-utils";
import Problem from "@/views/Problem.vue";
import mockAxios from "axios";

describe("Problem.vue", () => {
  let wrapper;

  beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { 
          problem: "mockAxiosProb",
          pk: 15
        }
      })
    );
    
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data:
          [
            { category: "mockAxiosCat", pk: 99 },
            { category: "mockAxiosCat2", pk: 199 }
          ]
      })
    );

    wrapper = shallowMount(Problem, {
      mocks: {
        $route: {
          name: 'problem',
          path: 'problem/1',
          params: { problemPk: 1 }
        }
      },
      stubs: ["router-link", "router-view"]
    });

    window.alert = (jsdomAlert) => {console.log(jsdomAlert)};
    jest.clearAllMocks();
  });
  

  it("sets the correct default data", () => {
    expect(typeof Problem.data).toBe('function');
    const defaultData = Problem.data();
    const expectedData = {
      problem: {
        problem: "",
        pk: "1"
      },
      categories: [],
      editTitle: false
    }
    expect(defaultData.problem).toMatchObject(expectedData.problem);
    expect(defaultData.categories).toMatchObject(expectedData.categories);
    expect(defaultData.editTitle).toBe(expectedData.editTitle);
  });

  it("loads api data", () => {
    expect(wrapper.vm.problem.problem).toBe("mockAxiosProb");
    expect(wrapper.vm.categories[0].category).toBe("mockAxiosCat");
  });

  it("shows problem and categories when data is loaded", () => {
    expect(wrapper.html()).toContain("mockAxiosProb");
    expect(wrapper.findAll("#category-card").length).toBe(2);
  });

  it("adds a category when button is clicked", async () => {
    expect(mockAxios.put).toHaveBeenCalledTimes(0);
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: { 
          category: "New category",
          pk: 299
        }
      })
    );
    const addBtn = wrapper.find("#add-category");

    addBtn.trigger("click");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("#category-card").length).toBe(3);
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
  });
});