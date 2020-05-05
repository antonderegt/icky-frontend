import { shallowMount } from "@vue/test-utils";
import Problem from "@/views/Problem.vue";

describe("Problem.vue", () => {
    const wrapper = shallowMount(Problem, {
        mocks: {
            $route: { 
                name: 'problem', 
                path: 'problem/1',
                params: { problemPk: 1 }}
        },
        stubs: ["router-link", "router-view"]
    });
    
    it("sets the correct default data", () => {
        expect(typeof Problem.data).toBe('function');
        const defaultData = Problem.data();
        const expectedData = {
            problem: "",
            categories: [],
            editTitle: false
        }
        expect(defaultData.problem).toBe(expectedData.problem);
        expect(defaultData.categories).toMatchObject(expectedData.categories);
        expect(defaultData.editTitle).toBe(expectedData.editTitle);
    });
});