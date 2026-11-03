import { expect, test } from "vite-plus/test";

// required checks の検証用。test ジョブを意図的に落とす（マージしない）
test("ruleset probe", () => {
  expect(1).toBe(2);
});
