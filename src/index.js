/*
 * IMPORTANT FILES AND LIBRARIES
 *
 * Nodemon is a library that keeps our script running, i.e. we do not need to re-enter npm start 
 * each time we make a change
 *
 * Babel is a library that "transpiles your code to vanilla JavaScript". This way, we can use newer
 * JS features that may not exist in Node.js yet. Change the .babelrc file to activate different
 * JS features
 * 
 * CORS allows cross-library resource sharing
 * uuid is used to generate unique IDs
 *
 * Open the .env file to store sensitive data separate from the source code
 * console.log(process.env.MY_SECRET);
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import models from './models/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get sample data from models/index.js
app.use((req, res, next) => {
	req.context = {
		models,
		me: models.users[1],
	};
	next();
});

/******* ENDPOINTS *******/

// GET

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.get('/session', (req, res) => {
	return res.send(req.context.models.users[req.context.me.id]);
})

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:id', (req, res) => {
  return res.send(req.context.models.users[req.params.id]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

// POST

app.post('/users', (req, res) => {
	if(!req.body.username) {
		return res.status(400).send({
			success: 'false',
			message: 'no username provided',
		});
	};
	const id = Object.keys(req.context.models.users).length + 1;
	const user = {
		id,
		username: req.body.username,
	};
	req.context.models.users[id] = user;
	return res.send(user);
});

app.post('/messages', (req, res) => {
	if(!req.body.text) {
		return res.status(400).send({
			success: 'false',
			message: 'no text provided',
		});
	} else if (!req.body.to) {
		return res.status(400).send({
			success: 'false',
			message: 'no to address provided',
		});
	}
	const messageId = uuidv4();
	const message = {
		messageId,
		text: req.body.text,
		to: req.body.to,
		from: req.context.me.id,
	};
	req.context.models.messages[messageId] = message;
	return res.send(message);
});

// PUT

app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  );
});

// DELETE

app.delete('/users/:userId', (req, res) => {
  
	const userId = parseInt(req.params.userId, 10);
	let index = userId-1;

	if(models.users[index].id == userId){
		models.users.splice(index, 1);
		return res.status(200).send({
			success: 'true',
			message: 'User deleted successfully',
		});
	}
	
	return res.status(404).send({
		success: 'false',
		message: 'User not found',
	});
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;
  req.context.models.messages = otherMessages;
  return res.send(message);
});

// Print to command line when app starts up
app.listen(process.env.PORT, () => 
	console.log(`App listening on port ${process.env.PORT}!`));
