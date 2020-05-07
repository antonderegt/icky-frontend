import { shallowMount } from "@vue/test-utils";
import CategoryCard from "@/components/CategoryCard.vue";
import mockAxios from "axios";

describe("CategoryCard.vue", () => {
  let wrapper;

  beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          { item: "mockItem 1", pk: 33 },
          { item: "mockItem 2", pk: 333 }
        ] 
      })
    );

    wrapper = shallowMount(CategoryCard, {
      propsData: {
        problemPk: 1,
        catName: "mockCategory",
        catPk: 1
      },
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
    expect(typeof CategoryCard.data).toBe('function');
    const defaultData = CategoryCard.data();
    const expectedData = {
      category: "",
      items: [],
      deleting: false,
      showCategory: true,
      newItem: "",
      editTitle: false,
      editItem: -1,
      changedItem: ""
    }
    expect(defaultData).toMatchObject(expectedData);
  })

  it("renders category when passed", async () => {
    expect(wrapper.html()).toContain('mockCategory');
  });

  it("receives the correct props", () => {
    expect(wrapper.props().problemPk).toBe(1);
  })
});
