const { chance, createMessage } = require('./utils');

const dialogs = [];
const users = [];
const channels = [];

const channelsCount = 4;
for (let i = 0; i < channelsCount; i++) {
  channels.push(chance.email());
}

const getRandomMessage = userIDs => ({
  id: chance.guid(),
  owner: chance.pick(userIDs),
  content: {
    text: chance.sentence()
  },
  date: chance.date({ year: 2018 })
});

const getMessages = (userIDs, count = 12) => {
  const messages = [];
  for (let i = count; i > 0; i--) {
    messages.push(getRandomMessage(userIDs));
  }
  return messages;
};

const initializeDB = () => {
  const userCount = 12;
  const dialogsCount = 1000;

  for (let i = 0; i < userCount; i++) {
    users.push({
      name: chance.name(),
      id: chance.guid(),
      avatar: chance.avatar()
    });
  }

  for (let i = 0; i < dialogsCount; i++) {
    const participants = chance.pickset(
      users.map(user => user.id),
      chance.integer({ min: 1, max: userCount })
    );

    dialogs.push({
      id: chance.guid(),
      name: chance.company(),
      avatar: chance.avatar(),
      participants,
      messages: getMessages(participants),
      channel: ['email', chance.pick(channels)],
      date: chance.date({ year: 2018 })
    });
  }

  users.forEach(user => {
    user.activeDialog = chance.pick(
      dialogs.filter(dialog => dialog.participants.includes(user.id))
    ).id;
  });
};

const interval = 2000;
const max = 100;
let count = 0;

const simulateCreateMessage = io => {
  if (count < max) {
    count++;
    const input = chance.sentence();
    const messageID = chance.guid();
    const dialog = chance.pick(
      [...dialogs]
        .sort((d1, d2) => new Date(d2.date) - new Date(d1.date))
        .slice(0, 20)
    );
    const dialogID = dialog.id;
    const userID = chance.pick(dialog.participants);
    const date = new Date().toISOString();

    createMessage(io, dialogs, { userID, dialogID, messageID, date, input });
  }
};

function simulateActivity(io) {
  setInterval(simulateCreateMessage, interval, io);
}

module.exports = { users, dialogs, channels, initializeDB, simulateActivity };
