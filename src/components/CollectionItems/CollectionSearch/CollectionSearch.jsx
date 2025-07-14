import { useState } from 'react'
import styles from './CollectionSearch.module.css'

export default function CollectionSearch({ filteredCollection, setDisplayCollection, displayCollection, collection, setCollection }) {

    const [query, setQuery] = useState('')

    function search(e) {
        const searchTitle = e.target.value
        setQuery(searchTitle)

        // Фильтруем исходный полный список allCollection
        const filteredItems = displayCollection.filter(item =>
            item.title.toLowerCase().includes(searchTitle.toLowerCase())
        )

        setCollection(filteredItems)
    }

    return (
        <>
            <input className={styles.search} type="text" placeholder="Поиск"
                onChange={search} />
        </>
    )
}
