const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91
}
const code = `function callme(){
    console.log('inside call me method);
    callme()
    callme()
}`
const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'Content-Type': 'application/json',
		'X-RapidAPI-Key': 'cf15a92240msh9302b46918f0510p1e43cajsn241fe81c4498',
		'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
	},
	body: {
		language_id: 93,
		source_code: (code),
		//stdin: 'SnVkZ2Uw'
	}
};

async function callApi(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const tokenId = result.tokenId;
        console.log({result});
        let statusCode = 2;
        while(statusCode === 2 | statusCode === 1){
            let result = await getSubmission(tokenId);
            statusCode = result.status_id;
            console.log(result.status,{result})
        }
    } catch (error) {
        console.log("error occured",{error});
    }
}
//callApi();
async function getSubmission(tokenId){
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
	console.log(result);
} catch (error) {
	console.error({error});
}
}
getSubmission('');