package provider.books

import java.util.UUID

import org.springframework.stereotype.Service

@Service
class Library(
        private val dataStore: BookDataStore
) {

    fun findById(id: UUID): BookRecord {
        return dataStore.getById(id) ?: throw NotFoundException()
    }

}

data class Book(
        val isbn: String,
        val title: String,
        val description: String?,
        val authors: List<String>?,
        val numberOfPages: Int?
)

data class BookRecord(val id: UUID, val book: Book)