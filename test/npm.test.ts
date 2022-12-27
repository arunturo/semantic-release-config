import template = require("lodash.template");

import npm from "~/npm";

describe("npm", () => {
  test.each(["next", undefined])(
    "semantic-release/@git generates the right commit message for channel %s",
    (channel) => {
      const gitPlugin = npm.plugins.find(
        (plugin) => plugin[0] === "@semantic-release/git"
      );
      expect(gitPlugin).toBeDefined();
      const pluginConfig = ((gitPlugin && gitPlugin[1]) || { message: "" }) as {
        message: string;
      };
      expect(
        template(pluginConfig.message || "")({
          nextRelease: {
            version: "test",
            channel: channel,
            notes: "This is a test release",
          },
        })
      ).toMatchSnapshot();
    }
  );
});
