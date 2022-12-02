const contentstackService = require("./service")();
const EMAIL = "jjensen@dminc.com";
const PASSWORD = "Lacrosse.26";
const API_KEY = "blt7e1304b5800a5756";

const mainline = async () => {
  console.log (contentstackService);

  let contentstackClient;
  const CONTENT_TYPE = "author_info";
  console.log("+++++ - Log into Contentstack using user account");
  const loginResponse = await contentstackService.contentstackLogin({
    email: EMAIL,
    password: PASSWORD,
  });
  console.log (loginResponse);
  if (loginResponse.success) {
    console.log ("Successfully logged into user account");
    contentstackClient = loginResponse.contentstackClient;
  }
  else {
    console.log ("Error logging into user account");
    console.log (loginResponse.error);
  }

  var entry = {
    title: "Sample Entry",
    content: "sampleEntry",
  };

  console.log("+++++ - Create a New Footer Entry");
  const addEntryResponse = await contentstackService.addNewContentstackEntry({
    contentstackClient,
    entry,
    api_key: API_KEY,
    contentType: CONTENT_TYPE,
  });
  console.log (addEntryResponse);
  if (addEntryResponse.success) {
    console.log ("Successfully added new entry");
    console.log(
      `+++++ Added new content entry "${addEntryResponse.result.title}" UID: "${addEntryResponse.result.uid}" of type: ${CONTENT_TYPE}`
    );
  }
  else {
    console.log ("Error Adding new entry");
    console.log (addEntryResponse.error);
  }

};

mainline();
