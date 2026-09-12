const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const express = require('express');
const { execFile } = require('child_process');

async function main() {
	const rl = readline.createInterface({ input, output });	
	const { default: open } = await import('open');

	try {
		const ip = await rl.question("Enter the IP address: ");
		const inputPort = await rl.question("Enter the port (Default 5555): ");
		const port = Number(inputPort || 5555);
		const ADB_DEVICE = `${ip}:${port}`;

		const app = express();

		app.use(express.static('public'));

		app.get('/adb/:keycode', (req, res) => {
		    execFile('adb', [
			'-s', ADB_DEVICE,
			'shell',
			'input',
			'keyevent',
			req.params.keycode
		    ], (error, stdout, stderr) => {
			if (error) {
			    console.error(stderr);
			    return res.status(500).send(stderr);
			}

			res.send('OK');
		    });
		});

		execFile('adb', ['connect', ADB_DEVICE], (error, stdout, stderr) => {
		    if (error) {
			console.error('ADB connect failed:', stderr);
			return;
		    }

		    console.log(stdout);

		    app.listen(3000, async () => {
			const url = 'http://127.0.0.1:3000'
			console.log(`Running on ${url}`);
			await open(url);
		    });
		});
	} catch(err) {
		console.log(err);	
	} finally {
		rl.close();
	}
}

main();
