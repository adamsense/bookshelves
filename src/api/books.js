import request from '@/utils/request'
import { jsonToObject } from '@/utils/helper'
export function getBooks(pNum) {
    return request({
        url: `books/?page=${pNum}`,
        method: 'get',

    })
}

export function getBookById(bookId) {
    return request({
        url: `books/${bookId}/`,
        method: 'get',

    })
}

export function GetBookById(bookId) {
    return new Promise((resolve, reject) => {
        getBookById(bookId).then(response => {
            let book = jsonToObject(response)
            resolve(book)
        }).catch(error => {
            reject(error)
        })
    })
}