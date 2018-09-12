const Chance = require('chance');
const chance = new Chance();

const createMessage = (
  io,
  dialogs,
  { userID, dialogID, messageID, date, input }
) => {
  const dialog = dialogs.find(dialog => dialog.id === dialogID);
  const message = {
    id: messageID,
    content: {
      text: input
    },
    owner: userID,
    date: date
  };
  dialog.messages.push(message);
  io.emit('NEW_MESSAGE', { dialogID: dialog.id, ...message });
};

module.exports = { createMessage, chance };
