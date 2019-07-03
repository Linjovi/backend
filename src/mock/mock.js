import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Consumers } from './data/data';
let _Consumers = Consumers;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
      let mock = new MockAdapter(axios);
  
      // mock success request
      mock.onGet('/success').reply(200, {
        msg: 'success'
      });
  
      // mock error request
      mock.onGet('/error').reply(500, {
        msg: 'failure'
      });
  
      //登录
      mock.onPost('/login').reply(config => {
        let {username, password} = JSON.parse(config.data);
        return new Promise((resolve, reject) => {
          let user = null;
          setTimeout(() => {
            let hasUser = LoginUsers.some(u => {
              if (u.username === username && u.password === password) {
                user = JSON.parse(JSON.stringify(u));
                user.password = undefined;
                return true;
              }
            });
  
            if (hasUser) {
              resolve([200, { code: 200, msg: '请求成功', user }]);
            } else {
              resolve([200, { code: 500, msg: '账号或密码错误' }]);
            }
          }, 1000);
        });
      });
  
      //获取用户列表
      mock.onGet('/consumer/list').reply(config => {
        let {name} = config.params;
        let mockConsumers = _Consumers.filter(consumer => {
          if (name && consumer.name.indexOf(name) == -1) return false;
          return true;
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              consumers: mockConsumers
            }]);
          }, 1000);
        });
      });
  
      //获取用户列表（分页）
      mock.onGet('/consumer/listpage').reply(config => {
        let {page, name} = config.params;
        let mockConsumers = _Consumers.filter(consumer => {
          if (name && consumer.name.indexOf(name) == -1) return false;
          return true;
        });
        let total = mockConsumers.length;
        mockConsumers = mockConsumers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              total: total,
              consumers: mockConsumers
            }]);
          }, 1000);
        });
      });

      //删除用户
      mock.onGet('/consumer/remove').reply(config => {
        let { id } = config.params;
        _Consumers = _Consumers.filter(c => c.id !== id);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功'
            }]);
          }, 500);
        });
      });

      //批量删除用户
      mock.onGet('/consumer/batchremove').reply(config => {
        let { ids } = config.params;
        ids = ids.split(',');
        _Consumers = _Consumers.filter(c => !ids.includes(c.id));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功'
            }]);
          }, 500);
        });
      });

      //编辑用户
      mock.onGet('/consumer/edit').reply(config => {
        let { id, name, addr, age, birth, sex, phone } = config.params;
        _Consumers.some(c => {
          if (c.id === id) {
            c.name = name;
            c.addr = addr;
            c.age = age;
            c.birth = birth;
            c.sex = sex;
            c.phone = phone;
            return true;
          }
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '编辑成功'
            }]);
          }, 500);
        });
      });

      //新增用户
      mock.onGet('/consumer/add').reply(config => {
        let { name, addr, age, birth, sex, phone } = config.params;
        _Consumers.push({
          name: name,
          addr: addr,
          age: age,
          birth: birth,
          sex: sex,
          phone:phone
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '新增成功'
            }]);
          }, 500);
        });
      });
  
    }
  };