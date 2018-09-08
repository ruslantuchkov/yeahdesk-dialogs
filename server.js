const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { dialogs, users, initializeDB } = require('./initializeDB');
const { createMessage, chance } = require('./utils');

let app = express();
const server = http.createServer(app);
const io = socketIO(server);

initializeDB();
const currentUser = chance.pick(users);

app.use((req, res, next) => {
  setTimeout(next, 300);
});

app.get('/api/users/current', (req, res) => {
  res.json(currentUser);
});

app.get('/api/dialogs/:from/:to', ({ params: { from, to } }, res) => {
  res.json(dialogs.slice(from, to));
});

app.post(
  '/api/dialogs/create/:ownerId/:name',
  ({ params: { name, ownerId } }, res) => {
    const dialog = {
      id: chance.guid(),
      name,
      participants: [],
      messages: [],
      channel: ['user', ownerId]
    };
    dialogs.push(dialog);
    res.status(300).json(dialog);
  }
);

app.get('/api/dialogs/:id', ({ params: { id } }, res) => {
  res.json(dialogs.find(dialog => dialog.id === id));
});

app.put(
  '/api/users/activeDialog/:userID/:dialogID',
  ({ params: { userID, dialogID } }, res) => {
    users.find(user => user.id === userID).activeDialog = dialogID;
    res.send(true);
  }
);

app.get('/api/users/:id', (req, res) => {
  res.json(
    users
      .map(({ name, id }) => ({ name, id }))
      .find(user => user.id === req.params.id)
  );
});

app.post(
  '/api/dialogs/submit/:userID/:dialogID/:messageID/:input',
  ({ params: { userID, dialogID, messageID, input } }, res) => {
    const user = users.find(user => user.id === userID);
    if (!user) {
      return res.status(404).send();
    }
    createMessage(io, { userID, dialogID, messageID, input });
    res.status(300).send();
  }
);

const port = 5000;

server.listen(port, () => {
  console.info(`api-сервер запущен на порту ${port}`);
});
