const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
  dialogs,
  users,
  channels,
  initializeDB,
  simulateActivity
} = require('./initializeDB');
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

app.get('/api/dialogs/channels', (req, res) => {
  res.json(channels);
});

app.get(
  '/api/dialogs/:from/:to/:sort/:search/:channels',
  ({ params: { from, to, sort, search, channels } }, res) => {
    let filteredDialogs = dialogs;
    if (channels !== '_') {
      filteredDialogs = filteredDialogs.filter(dialog => {
        return channels.split(',').includes(dialog.channel[1]);
      });
    }
    if (search !== '_') {
      filteredDialogs = dialogs.filter(dialog => {
        return dialog.name.toLowerCase().match(search.toLowerCase());
      });
    }
    let sortedDialogs;
    if (sort === 'old') {
      sortedDialogs = [...filteredDialogs].sort(
        (d1, d2) => new Date(d1.date) - new Date(d2.date)
      );
    } else if (sort === 'new') {
      sortedDialogs = [...filteredDialogs].sort(
        (d1, d2) => new Date(d2.date) - new Date(d1.date)
      );
    }
    res.json({
      dialogs: sortedDialogs.slice(from, to),
      hasMore: !!sortedDialogs[to + 1]
    });
  }
);

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
  res.json(users.find(user => user.id === req.params.id));
});

app.post(
  '/api/dialogs/submit/:userID/:dialogID/:messageID/:date/:input',
  ({ params: { userID, dialogID, messageID, date, input } }, res) => {
    const user = users.find(user => user.id === userID);
    if (!user) {
      return res.status(404).send();
    }
    createMessage(io, dialogs, { userID, dialogID, messageID, date, input });
    res.status(200).send();
  }
);

const port = 5000;

server.listen(port, () => {
  console.info(`api-сервер запущен на порту ${port}`);
});

// simulateActivity(io, currentUser.id);
