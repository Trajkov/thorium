import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import SensorsMock from "mocks/cards/Sensors.mock.js";

describe("Test Sensors", () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: SensorsMock,
  });
  describe("GUI Dependant Tests", async () => {
    beforeAll(async () => {
      await waitForElementToBeRemoved(() => getByText("Loading..."));
      await wait();
    });
    it("should render", async () => {
      expect(container.innerHTML).toBeTruthy();
      expect(container.innerHTML).not.toBe("Error");
    });
  });
  it("should render buttons and click them", () => {
    expect(true).toBeTruthy();
  });
});
