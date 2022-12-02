# Lighthouse Report Generator
This project will extract actual scores from a Lighthouse Test JSON export.

## Prerequisites:
- vs-code
- Node JS version 8+

## Initial Setup:
To install the application, run the following command

```
$ npm install 
```
   
## Import Content

The input directory contains two zip files which are the XM exports for QA and production.  
Create either a "QA" or "Prod" folder, and unzip the pages directory into that directory.

Change the main index file with the appropriate directory and number of files to extract 
as shown below:

```
runContentImport({
  directory: "/input/www.echopark.com-20221025T151855-MO-HOME.json",
  limit: 1,
});
```

Run the index file to extract the scores.

```
node index.js
```
