import { storiesOf } from "@storybook/vue";
import { Button } from "../dist/components";

storiesOf("Button", module).add("Button", () => ({
  components: { Button },
  data() {
    return {
      buttonList: [
        {
          key: "name",
          name: "姓名",
        },
      ],
    };
  },

  template: `
  <Button :buttonList="buttonList" />`,
}));
