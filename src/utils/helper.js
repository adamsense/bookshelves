export function jsonToObject(element) {
    if (element.bookshelves.length < 1) {
        element.bookshelves = new Array("empty")
    }
    return {
        id: element?.["id"],
        title: element?.["title"],
        authors: element?.["authors"],
        bookshelves: element?.["bookshelves"],
        img: element?.["formats"]?.["image/jpeg"]
    }

}

export function jsonToObjectList(object) {
    const arr = []
    object.forEach(element => {
        arr.push(jsonToObject(element))
    });
    return arr
}


export function sortByBookShelves(arr) {

    let results = arr.reduce((bookshelves, book) => {
        const bs = [...book.bookshelves];
        if (bs.length == 0) {
            book.bookShelvesList = []
            book.bookShelvesList.push("empty")
        }
        bs.forEach(element => {

            if (!bookshelves.find(item => item.el == element)) {
                bookshelves.push({ el: element, books: [] })
            }

            if (bookshelves?.[element] == null) {
                bookshelves.find(item => item.el == element)?.books.push(book.id)
            }
        });
        return bookshelves;
    }, [])

    const tempArray = arr.reduce((pair, firstBook) => {
        arr.forEach(secondBook => {
            if (firstBook.id != secondBook.id) {
                results.forEach(element => {
                    if (element.books.find(ell => ell == firstBook.id) && element.books.find(ell => ell == secondBook.id)) {
                        const item = pair.find(item =>
                            (item.b1 == firstBook.id && item.b2 == secondBook.id)
                            && !(item.b1 == secondBook.id && item.b2 == firstBook.id))
                        const item2 = pair.find(item =>
                            (item.b1 == secondBook.id && item.b2 == firstBook.id))

                        if (item == null && item2 == null) {
                            const books = []
                            books.push(element.el)
                            pair.push({ b1: firstBook.id, b2: secondBook.id, books: books })
                        }
                        else if (item != null) {
                            item.books.push(element.el)
                        } else if (item2 != null) {
                            item2.books.push(element.el)
                        }
                    }
                })

            }
        })
        return pair.sort((a, b) => a.books.length <= b.books.length && 1 || -1)
    }, [])

    let sortedBookId = []
    let i = 0;
    for (i = 0; i < tempArray.length;) {
        let j = tempArray[i]?.books.length
        while (j == tempArray[i]?.books.length || i == tempArray.length - 1) {
            if (!(sortedBookId.find(item => item == tempArray[i].b1))) {
                sortedBookId.push(tempArray[i]?.b1)
            }
            if (!(sortedBookId.find(item => item == tempArray[i].b2))) {
                sortedBookId.push(tempArray[i].b2)
            }
            i++
            if (j < tempArray[i]?.books.length) {
                j = 0
            }

        }
        //adding books with just 1 bookshelves to the end of the list
        arr.forEach(element => {
            const a = sortedBookId.includes(element.id)
            if (!a) {
                sortedBookId.push(element.id)
            }
        });
    }

    let sortedBookList = []
    sortedBookId.forEach(element => {
        let i = arr.find(item => item.id == element)
        sortedBookList.push(i)
    });
    return sortedBookList
}



