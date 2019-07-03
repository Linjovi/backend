import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '12345',
    name: '张某某',
    icon: "http://img5.imgtn.bdimg.com/it/u=2207199792,3551696691&fm=26&gp=0.jpg"
  },
  {
    id: 2,
    username: 'admin2',
    password: '123456',
    name: '李某某',
    icon: 'http://tupian.qqjay.com/tou2/2018/0418/11110157f2af0e0d6c3c34c9be7535ed.jpg'
  }
];

const Consumers = [];

for (let i = 0; i < 186; i++) {
  Consumers.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    phone: /^1[34578][1-9]\d{8}/
  }));
}

export { LoginUsers, Consumers };