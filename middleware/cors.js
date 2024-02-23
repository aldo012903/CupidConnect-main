export default function({req, res, next}) {
	res.setHeader('Access-Control-Allow-Origin','http://localhost:8000,http://localhost:3000,https://23.20.92.32:8000,https://23.20.92.32:3000');
	res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	next();
}
