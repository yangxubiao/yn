import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'Admin', component: () => import('./views/Admin.vue') },
    { path: '/index',name: 'index', component: () => import('./views/index.vue') },
    { path: '/userLogin',name: 'userLogin', component: () => import('./views/userLogin.vue') },
    { path: '/chage',name: 'chage', component: () => import('./views/chage.vue')},
    { path: '/userRegister',name: 'userRegister', component: () => import('./views/userRegister.vue')},
    { path: '/userSearch',name: 'userSearch', component: () => import('./views/userSearch.vue') },
    { path: '/userChargeAll',name: 'userChargeAll', component: () => import('./views/userChargeAll.vue') },
    { path: '/userList',name: 'userList', component: () => import('./views/userList.vue')},
    { path: '/userRecord',name: 'userRecord', component: () => import('./views/userRecord.vue')},
    { path: '/userCharge',name: 'userCharge', component: () => import('./views/userCharge.vue')},
    { path: '/chargeAll',name: 'chargeAll', component: () => import('./views/chargeAll.vue')},
    { path: '/userConsumption',name: 'userConsumption', component: () => import('./views/userConsumption.vue')},
    { path: '/userUpdate',name: 'userUpdate', component: () => import('./views/userUpdate.vue')}
  ]
})
