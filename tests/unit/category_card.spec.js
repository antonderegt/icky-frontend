import { shallowMount } from "@vue/test-utils";
import CategoryCard from "@/components/CategoryCard.vue";

describe("CategoryCard.vue", () => {
  it("renders category when passed", async () => {
    const wrapper = shallowMount(CategoryCard, {
      propsData: {
        problemPk: "1",
        catName: "Category Name",
        catPk: 1
      }
    });
    // console.log(CategoryCard);
    // console.log(wrapper.html());

    // wrapper.vm.getItems(); //.$mount;
    // await wrapper.vm.$nextTick()
    // console.log(wrapper.html());
    expect(wrapper.html()).toContain('Category Name');
  });
});
