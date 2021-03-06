import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";

import {
  JR_NAVIGATION_QUERY,
  JR_NAVIGATION_SUB,
} from "components/views/JrFlight/navigation.js";
import {JR_THRUSTER_QUERY} from "components/views/JrFlight/thrusters.js";
import {
  JR_SPEEDCHANGE_SUB,
  JR_ENGINE_QUERY,
} from "components/views/JrFlight/engines.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      JR_NAVIGATION_QUERY,
      JR_NAVIGATION_SUB,
      JR_THRUSTER_QUERY,
      JR_SPEEDCHANGE_SUB,
      JR_ENGINE_QUERY,
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
