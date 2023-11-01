export default {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./test/globalSetup.ts",
  setupFilesAfterEnv: ["./test/jest.setup.ts"],
};
