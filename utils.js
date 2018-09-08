const Chance = require('chance');
const chance = new Chance();

const createMessage = (io, { userID, dialogID, input }) => {
  const dialog = dialogs.find(dialog => dialog.id === dialogID);
  const message = {
    id: chance.guid(),
    content: {
      text: input
    },
    owner: userID,
    date: new Date()
  };
  dialog.messages.push(message);
  io.emit('NEW_MESSAGE', { dialogID: dialog.id, ...message });
};

module.exports = { createMessage, chance };
