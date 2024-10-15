const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91
}
async function getSubmission(tokenId,callback){
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}2e979232-92fd-4012-97cf-3e9177257d10?base64_encoded=true&fields=*`;
const options = {
	method: 'GET',
	headers: {
        'content-type':"application/octet-stream",
		'X-RapidAPI-Key': 'cf15a92240msh9302b46918f0510p1e43cajsn241fe81c4498',
		'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    return result;
} catch (error) {
callback({apistatus:'error',message:JSON.stringify(error)})
}
}
export  async function makeSubmission({code, language, callback,stdin}) {
    //make submisson handle the status of the submission
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*'
    const httpOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'cf15a92240msh9302b46918f0510p1e43cajsn241fe81c4498',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
            language_id: languageCodeMap[language],
            source_code: btoa(code),
            stdin:btoa(stdin)
        })
    }
    /* generic response
    {
        apiStatus:'loading' | 'error' | 'success',
        data: response,
        message'Runtime error' | 'compilation error'
    }*/
    try {
        callback({apistatus:'loading'})
        const response = await fetch(url,httpOptions);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode = 1  // in queue
        let apiSubmissionResult;
        while(statusCode === 1 | statusCode === 2){
          try {
            apiSubmissionResult = await getSubmission(tokenId)
            statusCode = apiSubmissionResult.status.id;
          } catch (error) {
            callback({apistatus:'error',message:JSON.stringify(error)})
            return;
          }
        }
        if(apiSubmissionResult){
            callback({apistatus:'success', data:apiSubmissionResult })
        }
    } catch (error) {
        callback({
            apistatus:'error',
            message:JSON.stringify(error)
        });
    }
}