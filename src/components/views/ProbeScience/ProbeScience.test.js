import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import ProbeScienceMock from "mocks/cards/ProbeScience.mock.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: ProbeScienceMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
