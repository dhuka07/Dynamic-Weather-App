import React from "react";
import UnitToggle from "./UnitToggle";

export default {
  title: "UnitToggle",
  component: UnitToggle,
};

const Template = (args) => <UnitToggle {...args} />;

export const Metric = Template.bind({});
Metric.args = {
  unit: "metric",
  toggleUnit: () => console.log("Toggled to Imperial"),
};

export const Imperial = Template.bind({});
Imperial.args = {
  unit: "imperial",
  toggleUnit: () => console.log("Toggled to Metric"),
};