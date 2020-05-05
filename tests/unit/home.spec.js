import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
    const wrapper = shallowMount(Home, {
        stubs: ["router-link"]
    });

    it("renders the title", () => {
        expect(wrapper.html()).toContain("Welcome to Icky");
    });

    it("sets the correct default data", () => {
        expect(typeof Home.data).toBe('function')
        const defaultData = Home.data()
        expect(defaultData.problems).toMatchObject([])
    });

    it("shows a problem after it's added", async () => {
        wrapper.setData({ problems: [{pk: 1, problem: "Jest" }] })
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain("Jest")
    });
});