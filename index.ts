import _ from 'lodash';

export default async (mutate: () => any, statusChecker: () => any, intervalMS = 2000) => {
  const app = await mutate();

  return new Promise((resolve, reject) => {
    const checkStatus = async () => {
      const status = await statusChecker();
      if (_.isNil(status)) {
        setTimeout(checkStatus, intervalMS);
      } else {
        if (!status) {
          reject(app);
        } else {
          resolve(app);
        }
      }
    };
    checkStatus();
  });
};
