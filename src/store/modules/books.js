import { getBooks, getBookById } from '@/api/books'
import { jsonToObject, jsonToObjectList, sortByBookShelves } from '@/utils/helper'


const state = {
    count: 65986,
    listOfBooks: [],
    lastViewedBooks: []
}

const mutations = {

    SET_BOOKS_LIST: (state, books) => {
        state.listOfBooks = books;
    },
    ADD_TO_VIEWED_LIST: (state, bookId) => {
        if (!state.lastViewedBooks.includes(bookId)) {
            state.lastViewedBooks.push(bookId);
        }
    },
}



const actions = {
    GetBooks({ commit }, pageNum) {
        return new Promise((resolve, reject) => {
            getBooks(pageNum).then(response => {
                let sortedList = sortByBookShelves(jsonToObjectList(response.results))
                commit('SET_BOOKS_LIST', sortedList)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    AddBookToViewedList({ commit }, bookId) {
        return new Promise((resolve, reject) => {
            getBookById(bookId).then(response => {
                commit('ADD_TO_VIEWED_LIST', bookId)
                let book = jsonToObject(response)
                resolve(book)
            }).catch(error => {
                reject(error)
            })
        })


    },



}

const getters = {
    listOfBooks: state => state.listOfBooks,
    booksCount: state => state.count,
    lastViewedBooks: state => state.lastViewedBooks,

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}