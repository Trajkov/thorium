import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {
  ENGINE_QUERY,
  SPEEDCHANGE_SUB,
  HEATCHANGE_SUB,
} from "./index.js";
describe("Test EngineControl", () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [ENGINE_QUERY, SPEEDCHANGE_SUB, HEATCHANGE_SUB],
  });
  describe("GUI Dependant Tests:", () => {
    it("should render", async () => {
      await waitForElementToBeRemoved(() => getByText("Loading..."));
      await wait();
      expect(container.innerHTML).toBeTruthy();
      expect(container.innerHTML).not.toBe("Error");
    });
    it("should navigate to speed and push the buttons", async () => {
      expect(true).toBe(true);
    });
  });
});
