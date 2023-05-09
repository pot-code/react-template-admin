import { Meta, StoryFn } from "@storybook/react"
import DemoComp from "."

export default {
  title: "component/DemoComp",
  component: DemoComp,
} as Meta<typeof DemoComp>

const Template: StoryFn<typeof DemoComp> = (args) => <DemoComp {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: "Demo",
}
