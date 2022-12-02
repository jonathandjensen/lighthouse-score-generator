const fs = require("fs");
const path = require("path");
const glob = require("glob-promise");
const { Parser } = require('json2csv');

const auditUtils = require("./util/lighthouse/audits/index");

const getJSONFiles = async ({ directory, limit }) => {
  let pageCount = 0;
  const contentPath = path.join(__dirname, directory);
  const files = await glob(contentPath + "/**/*");

  console.log("Found " + files.length + " pages to process ...");

  for (const file of files) {
    const stats = fs.statSync(file);
    if (!stats.isFile()) continue;
    pageCount++;
    if (pageCount > limit) continue;

    await processJSONFile(file);
  }
};

const processJSONFile = async (file) => {
  console.log(`Now processing Lighthouse JSON file ${file}`);
  const fileContentString = await readJSONFile(file);
  const fileContentObject = JSON.parse(fileContentString);

  // Get Scores
  const pageScores = await auditUtils.getPageScores(fileContentObject);
  // console.log(pageScores);

  // convert to csv
	try {
		const parser = new Parser();
		const csv = parser.parse(pageScores.scores);
		const filename = file.split('/').slice(-1);
		// console.log(csv);

		fs.writeFile(`./output/lighthouse-scores--${filename}.csv`, csv, err => {
			if (err) {
				console.error(err);
			}
			// file written successfully
		});
	} catch (err) {
		console.error(err);
	}
};

const readJSONFile = async (fileName) => {
  let fileText;
  try {
    fileText = fs.readFileSync(fileName);
  } catch (err) {
    console.error(`Error reading  ${fileName}`);
    return null;
  }
  return fileText.toString();
};

const runContentImport = async ({ directory, limit }) => {
  console.log("Running the content import ...");
  getJSONFiles({ directory, limit });
};

runContentImport({
	directory: "/input",
	limit: 10,
});
