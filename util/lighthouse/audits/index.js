const getPageScores = async (fileContentObject) => {
	const audits = fileContentObject.audits;
	const categories = fileContentObject.categories;
	const auditTestNames = Object.keys(audits);
	const categoryTestNames = Object.keys(categories);
	const scores = [];
	let auditTest;
	let categoryTest;

	for (auditTest in auditTestNames) {
		const auditTestName = auditTestNames[auditTest];
		const auditTestResult = audits[auditTestName];
		const result = {
			"test_name": auditTestName,
			"metric": auditTestResult.title,
			"score": auditTestResult.score,
			"fcp": false,
			// "tti": false,
			// "si": false,
			"tbt": null,
			"lcp": null,
			"cls": null,
		};

		// console.log({auditTestName});

		for (categoryTest in categoryTestNames) {
			const categoryTestName = categoryTestNames[categoryTest];
			const categoryTestResult = categories[categoryTestName];
			const auditRefs = categoryTestResult['auditRefs'];

			// console.log({categoryTestName});

			// add audit ref weight to results
			const auditRef = auditRefs.filter((item) => item.id === auditTestName)[0];
			result[categoryTestName + '.weight'] = auditRef?.weight;

			// first-contentful-paint
			if (!result.fcp) {
				const auditRefFCP = auditRefs.filter((item) => item.id === 'first-contentful-paint')[0];
				if (auditRefFCP) {
					result['fcp'] = auditRefFCP['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
				}
			}

			// interactive
			// if (!result.tti) {
			// 	const auditRefTTI = auditRefs.filter((item) => item.id === 'interactive')[0];
			// 	if (auditRefTTI) {
			// 		result['tti'] = auditRefTTI['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
			// 	}
			// }

			// speed-index
			// if (!result.si) {
			// 	const auditRefSI = auditRefs.filter((item) => item.id === 'speed-index')[0];
			// 	if (auditRefSI) {
			// 		result['si'] = auditRefSI['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
			// 	}
			// }

			// total-blocking-time
			if (!result.tbt) {
				const auditRefTBT = auditRefs.filter((item) => item.id === 'total-blocking-time')[0];
				if (auditRefTBT) {
					result['tbt'] = auditRefTBT['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
				}
			}

			// largest-contentful-paint
			if (!result.lcp) {
				const auditRefLCP = auditRefs.filter((item) => item.id === 'largest-contentful-paint')[0];
				if (auditRefLCP) {
					result['lcp'] = auditRefLCP['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
				}
			}

			// cumulative-layout-shift
			if (!result.cls) {
				const auditRefCLS = auditRefs.filter((item) => item.id === 'cumulative-layout-shift')[0];
				if (auditRefCLS) {
					result['cls'] = auditRefCLS['relevantAudits'].indexOf(auditTestName) >= 0 ? true : null;
				}
			}
		}

		scores.push(result);
	}

  return {
		scores
  }
};

module.exports = {
	getPageScores,
};
