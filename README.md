<!-- Command Use in this sites -->
npm start - for server start
npm i uuid - for generete uniqu id 
npm i @monaco-editor/react - for implimentation code editor in web sites
<!-- Web site Name -->
WebCrafty
<!-- Using Other Material to make this site -->
sass
google icon

<!-- JavaScript -->
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
		language_id: 52,
		source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
		stdin: 'SnVkZ2Uw'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

<!-- Get A submission -->
async function getSubmission(tokenId){
const url = 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10?base64_encoded=true&fields=*';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cf15a92240msh9302b46918f0510p1e43cajsn241fe81c4498',
		'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}	