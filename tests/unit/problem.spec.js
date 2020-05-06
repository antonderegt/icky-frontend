import { shallowMount, mount, shallow } from "@vue/test-utils";
import Problem from "@/views/Problem.vue";

describe("Problem.vue", () => {
    const wrapper = shallowMount(Problem, {
        mocks: {
            $route: { 
                name: 'problem', 
                path: 'problem/1',
                params: { problemPk: "1" }}
        },
        stubs: ["router-link", "router-view"]
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

    it("shows problem name when data is loaded", () => {
        const problem = {
            problem: "Jest",
            pk: "1"
        }
        wrapper.setData({ problem })

        expect(wrapper.vm.$data.problem).toMatchObject(problem);
        expect(wrapper.vm.problem).toMatchObject(problem); // SAME TEST AS THE TEST ABOVE
    });

    it("shows a category when data is loaded", async () => {
        expect(wrapper.findAll("#category").length).toBe(0);

        const newCategory = {
            category: "Jest cat 1",
            pk: "2"
        }
        wrapper.setData( {categories: [newCategory]} )
        expect(wrapper.vm.categories).toMatchObject([newCategory]);
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll("#category").length).toBe(1);
    })

    it("adds a category when button is clicked", async () => {
        const addCatBtn = wrapper.find("#add-category");
        await addCatBtn.trigger("click");
        await wrapper.vm.$nextTick()
        console.log(wrapper.html());

        // await wrapper.vm.getProblem(); run method from wrapper
    });
});