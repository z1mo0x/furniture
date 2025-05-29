import { useState } from 'react'
import styles from './CollectionSearch.module.css'

export default function CollectionSearch({ displayCollection, collection, setCollection }) {

    const [query, setQuery] = useState('')

    function search(e) {
        setQuery(e.target.value)
        let searchTitle = e.target.value
        let filteredItems = []
        collection.filter((item) => {
            if (item.title == searchTitle) {
                filteredItems.push(item)
            }
        })
        setCollection(filteredItems)
    }

    return (
        <>
            {query}
            <input className={styles.search} type="text" placeholder="Поиск"
                onChange={search} />
        </>
    )
}
