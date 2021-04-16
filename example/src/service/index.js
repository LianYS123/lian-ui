const delay = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));
export const getFakeUsers = async (params) => {
  console.log(params);
  await delay(1000);
  return {
    code: '0000',
    data: [
      {
        id: 1,
        username: 'lian',
        sex: 'male'
      }
    ]
  };
};

export const fakeUpdate = async (values) => {
  await delay(1000);
  console.log('update', values);
  return {
    code: '0000'
  };
};

export const fakeAdd = async (values) => {
  await delay(1000);
  console.log('add', values);
  return {
    code: '0000'
  };
};

export const fakeDelete = async (values) => {
  await delay(1000);
  console.log('delete', values);
  return {
    code: '0000'
  };
};
