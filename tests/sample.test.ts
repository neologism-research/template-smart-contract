import { deployments } from "hardhat";

describe("Sample", function () {
  it("expect to deploy Sample", async function () {
    await deployments.fixture(["sample"]);
  });
});
