// Sample Data

let users = [
  {
    id: '1',
    username: 'Remus',
  },
  {
    id: '2',
    username: 'Demi',
  },
];
let messages = {
  1: {
    messageId: '1',
    text: 'Hello World',
    to: '2',
    from: '1',
  },
  2: {
    messageId: '2',
    text: 'Bye World',
    to: '2',
    from: '1',
  },
};

export default {
  users,
  messages,
};