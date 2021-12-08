import { userService } from "../../services/user.service.js";
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../../services/socket.service'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
    },
    getters: {
        users({ users }) { return users },
        loggedinUser(state) {
            return state.loggedinUser
        },
    },

    mutations: {
        setLoggedinUser(state, { user }) {
            console.log(user)
            state.loggedinUser = JSON.parse(JSON.stringify(user))
            userService.getLoggedinUser(user);
        },
        setUsers(state, { users }) {
            state.users = users;
        },
    },
    actions: {
        async login({ commit }, { user }) {
            try {
                const loggedinUser = await userService.login(user);
                commit({ type: 'setLoggedinUser', user: loggedinUser })
                return loggedinUser;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { user }) {
            try {
                const loggedinUser = await userService.signup(user)
                commit({ type: 'setLoggedinUser', user: loggedinUser })
                return loggedinUser;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await userService.getUsers();
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            } ''
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                commit({ type: 'setWatchedUser', user })
                socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
                socketService.off(SOCKET_EVENT_USER_UPDATED)
                socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                    commit({ type: 'setWatchedUser', user })
                })
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async updateUserLog({ commit }, { user }, { taskInfo }) {
            console.log(user)
            console.log(taskInfo)
            try {
                user = await userService.update(user);
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
    }
}


