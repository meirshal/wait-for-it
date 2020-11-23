# wait-for
A utility for promisifying operations that do not wait for completion but have a separate operation for fetching completion status.  

## Install
```sh
npm install wait-for-js --save
```
or
```
yarn add wait-for-js
```
## Usage
```javascript
import waitForIt from 'wait-for-js';

const context = {};

const mutation = () => {
  context.status = 'pending';
  setTimeout(() => {
    context.status = 'success';
  }, 5000);
};

const statusChecker = () => {
  if (context.status === 'pending') return;
  return context.status;
};

waitForIt(mutation, statusChecker, 1000)
  .then(status => console.log('finished with status:', status));
```

