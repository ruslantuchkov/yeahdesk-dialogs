const { chance } = require('./utils');

const dialogs = [];
const users = [];

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
  const channelsCount = 4;
  const channels = [];

  for (let i = 0; i < channelsCount; i++) {
    channels.push(chance.email());
  }

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
      channel: ['email', chance.pick(channels)]
    });
  }

  users.forEach(user => {
    user.activeDialog = chance.pick(
      dialogs.filter(dialog => dialog.participants.includes(user.id))
    ).id;
  });
};

module.exports = { users, dialogs, initializeDB };
