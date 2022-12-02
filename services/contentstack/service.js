module.exports = () => {
  const service = {};

  service.contentstackLogin = async ({ email, password }) => {
    const contentstack = require("@contentstack/management");
    const contentstackClient = contentstack.client();
    try {
      await contentstackClient.login({
        email: email,
        password: password,
      });
      return {
        success: true,
        message: "Successful logged into user account",
        error: "N/A",
        contentstackClient,
      };
    } catch (error) {
      console.log("An issue occurred logging into the users account");
      return {
        success: false,
        message: "An issue occurred logging into the user account",
        error: error,
        contentstackClient,
      };
    }
  };

  service.addNewContentstackEntry = async ({
    contentstackClient,
    api_key,
    entry,
    contentType,
  }) => {
    try {
      const result = await contentstackClient
        .stack({ api_key: api_key })
        .contentType(contentType)
        .entry()
        .create({ entry });
      return {
        success: true,
        message: "Successfully added a new entry",
        result,
      };
    } catch (error) {
      console.log (error);
      return {
        success: false,
        message: "An issue occurred adding a new entry",
        error: error,
      };
    }
  };

  console.log(service);

  return service;
};
