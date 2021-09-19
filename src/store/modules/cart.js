
const state = {
    cartItems: [],

}


const mutations = {
    ADD_ITEM_TO_CART: (state, book) => {
        state.cartItems.push(book);
    },
    REMOVE_ITEM_TO_CART: (state, bookId) => {
        state.cartItems = state.cartItems.filter((item) => {
            return item.id !== bookId;
        });
    },
}


const actions = {

    AddItem({ commit }, book) {
        commit('ADD_ITEM_TO_CART', book)
    },
    RemoveItem({ commit }, book) {
        commit('REMOVE_ITEM_TO_CART', book.id)
    },



}

const getters = {
    cartItems: state => state.cartItems,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}