import React from "react";
import {waitForElementToBeRemoved, wait, cleanup} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {SENSOR_QUERY, SENSOR_SUB} from "./index.js";

describe("Test Scanning", () => {
  describe("Test Sensor Scanning", () => {
    const {container, getByText} = render(
      <Component {...baseProps} domain="external" />,
      {
        queries: [
          [SENSOR_QUERY, [], {simulatorId: "test", domain: "external"}],
          [SENSOR_SUB, [], {simulatorId: "test", domain: "external"}],
        ],
      },
    );
    describe("GUI Tests", () => {
      beforeAll(async () => {
        await waitForElementToBeRemoved(() => getByText("Loading..."));
        await wait();
      });
      afterAll(async () => {
        await cleanup;
      });
      it("should render", async () => {
        expect(container.innerHTML).toBeTruthy();
        expect(container.innerHTML).not.toBe("Error");
      });
    });
  });
  // describe("Test Security Scanning", () => {
  //   const {container, getByText} = render(
  //     <Component {...baseProps} domain="internal" />,
  //     {
  //       queries: [
  //         [SENSOR_QUERY, [], {simulatorId: "test", domain: "internal"}],
  //         [SENSOR_SUB, [], {simulatorId: "test", domain: "internal"}],
  //       ],
  //     },
  //   );
  //   describe("GUI Tests", () => {
  //     beforeAll( async () => {
  //       await waitForElementToBeRemoved(() => getByText("Loading..."));
  //       await wait();
  //     });
  //     afterAll(cleanup);
  //     it("should render", async () => {
  //       expect(container.innerHTML).toBeTruthy();
  //       expect(container.innerHTML).not.toBe("Error");
  //     });
  //   });
  // });
});
// it("should render", async () => {
//   const {container, getByText} = render(
//     <Component domain="internal" {...baseProps} />,
//     {
//       queries: [
//         [SENSOR_QUERY, [], {simulatorId: "test", domain: "internal"}],
//         [SENSOR_SUB, [], {simulatorId: "test", domain: "internal"}],
//       ],
//     },
//   );
//   await waitForElementToBeRemoved(() => getByText("Loading..."));
//   await wait();

//   expect(container.innerHTML).toBeTruthy();
//   expect(container.innerHTML).not.toBe("Error");
// });
