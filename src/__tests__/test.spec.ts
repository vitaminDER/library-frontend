import { getSum } from "@/utils/helpers/regexp";

describe("getSum", () => {
  it("should sum", () => {
    expect(getSum(10, 2)).toBe(12);
  });
});
