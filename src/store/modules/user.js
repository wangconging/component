import { login, getMenuList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: '',
  userPermissions: {},
  roleListData: [],
  vueXData: 'storeModulesUser'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  ADD_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  ADD_PERMISSIONS: (state, userPermissions) => {
    state.userPermissions = userPermissions
  },
  ADD_ROLELISTDATA: (state, roleListData) => {
    state.roleListData = roleListData
  },
  SET_VUEXDATA: (state, vueXData) => {
    console.log(vueXData)
    state.vueXData = vueXData
  }
}

const actions = {
  changeVueXData({ commit }, data) {
    commit('SET_VUEXDATA', data)
  },
  roleInfo({ commit }, data) {
    commit('ADD_ROLELISTDATA', data)
  },
  // user login
  login({ commit }, userInfo) {
    const response = {
      'msg': '登录成功',
      'code': 200,
      'data': {
        'user': {
          'searchValue': null,
          'createBy': null,
          'createTime': '2020-11-03 16:30',
          'updateBy': null,
          'updateTime': null,
          'remark': null,
          'params': null,
          'delFlag': '0',
          'userId': 1,
          'loginName': 'admin',
          'userName': '超级管理员',
          'sex': '0',
          'avatar': '/touxiang',
          'password': 'd5783dbeedef2f59c91aaf93a5710dde',
          'salt': 'd4ed51',
          'status': '0',
          'loginIp': null,
          'sort': 'C',
          'loginDate': null,
          'roleId': 1,
          'roleName': null,
          'clientId': null,
          'phone': null,
          'admin': true
        },
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.O9XgdpvJoD8OYaK0S6DqiWTXWTFA_zWMz3teGpNEQK8'
      }
    }
    const { data } = response

    commit('SET_TOKEN', data.token)
    setToken(data.token)
    Cookies.set('userData', response.data)
    commit('ADD_USERINFO', data.user.loginName)
    // 真实接口
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ loginName: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     console.log(JSON.stringify(response))
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     Cookies.set('userData', response.data)
    //     commit('ADD_USERINFO', data.user.loginName)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: '../../assets/images/profile.jpg',
        name: 'Super Admin'
      }
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      const { roles, name, avatar, introduction } = data
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
    })
  },
  getUserPermissions({ commit, state, dispatch }) {
    getMenuList().then((response) => {
      commit('ADD_PERMISSIONS', response.data.menuList)
    }).catch(error => {
      console.log(error)
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    commit('ADD_USERINFO', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('ADD_USERINFO', [])
      removeToken()
      resolve()
    })
  },

  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      router.addRoutes(accessRoutes)

      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
