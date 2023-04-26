import Navigation from "../components/CustomNavigation.vue";
import { mount } from "@vue/test-utils";
import { tabs } from "../common/tabs";
import { TabsInterface } from "../interfaces/ITabs";
describe("Testing Custom Navigation Component", () => {
  /* This is a test case for the `CustomNavigation` component. It checks if the component is rendered
  with the correct props and if the click event on the first navigation link triggers the
  `handleTab` function. */
  test("Render component with right props", () => {
    const mockClick = jest.fn();
    /* This code is creating a wrapper component for the `Navigation` component using the `mount`
    function from the `@vue/test-utils` library. The `mount` function creates a Vue instance of the
    component and returns a wrapper object that allows you to interact with the component and test
    its behavior. */
    const wrapper = mount(Navigation, {
      props: {
        tabsData: [...tabs] as TabsInterface[],
        tabIdx: 0,
        handleTab: mockClick,
      },
    });
    /* `const navRef = wrapper.findAll("a")` is finding all the `<a>` elements in the rendered
    `Navigation` component and storing them in the `navRef` constant. This allows us to interact
    with the navigation links and test their behavior. */
    const navRef = wrapper.findAll("a");
    expect(navRef).toBeDefined();
    expect(navRef).toHaveLength(11);
    expect(wrapper.props("tabIdx")).toBe(0);
    /* `navRef[0].trigger("click");` is simulating a click event on the first navigation link in the
    `Navigation` component. This is done to test if the `handleTab` function is triggered when the
    first link is clicked. */
    navRef[0].trigger("click");
    /* `expect(mockClick).toHaveBeenCalled();` is an assertion that checks if the `mockClick` function
    has been called. In the test case, it is used to check if the `handleTab` function is triggered
    when the first navigation link is clicked. If the function is called, the assertion passes,
    otherwise, it fails. */
    expect(mockClick).toHaveBeenCalled();
  });
});
