import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/getUserInfo', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        menusList: [{
          id: '1',
          title: '南辰',
          subMenuList: [
            {
              id: '11',
              title: '南',
              path: '/user/nan'
            },
            {
              id: '12',
              title: '小',
              path: '/user/xiao'
            },
            {
              id: '13',
              title: '辰',
              path: '/user/chen'
            }
          ]
        }, {
          id: '2',
          title: '希',
          subMenuList: [
            {
              id: '21',
              title: '玩游戏',
              path: '/user/play'
            }
          ]
        }]
      }
    }
  }
] as MockMethod[] 
