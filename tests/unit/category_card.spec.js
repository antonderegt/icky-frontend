import { shallowMount } from "@vue/test-utils";
import CategoryCard from "@/components/CategoryCard.vue";

describe("CategoryCard.vue", () => {
  const wrapper = shallowMount(CategoryCard, {
    propsData: {
      problemPk: "1",
      catName: "Category Name",
      catPk: 1
    }
  });

  it("renders category when passed", async () => {
    expect(wrapper.html()).toContain('Category Name');
  });

  it("receives the correct props", () => {
    expect(wrapper.props().problemPk).toBe("1");
  })
});
