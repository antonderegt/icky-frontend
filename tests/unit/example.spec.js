import { shallowMount } from "@vue/test-utils";
import CategoryCard from "@/components/CategoryCard.vue";

describe("CategoryCard.vue", () => {
  it("renders category when passed", () => {
    const wrapper = shallowMount(CategoryCard, {
      propsData: {
        problemPk: "1",
        catName: "test",
        catPk: 1
      }
    });
    console.log(CategoryCard);
    expect(wrapper.html()).toContain('test');
  });
});
