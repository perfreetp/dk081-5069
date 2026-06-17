export default defineAppConfig({
  pages: [
    'pages/messages/index',
    'pages/dashboard/index',
    'pages/report/index',
    'pages/duty/index',
    'pages/alert-detail/index',
    'pages/whitelist/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1677FF',
    navigationBarTitleText: '滞留协同',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#1677FF',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/messages/index',
        text: '消息'
      },
      {
        pagePath: 'pages/dashboard/index',
        text: '区域看板'
      },
      {
        pagePath: 'pages/report/index',
        text: '协同上报'
      },
      {
        pagePath: 'pages/duty/index',
        text: '值班设置'
      }
    ]
  }
})
