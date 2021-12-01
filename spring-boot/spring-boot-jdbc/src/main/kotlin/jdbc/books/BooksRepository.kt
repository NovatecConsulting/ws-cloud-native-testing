package jdbc.books

import org.slf4j.LoggerFactory.getLogger
import org.springframework.dao.DuplicateKeyException
import org.springframework.dao.IncorrectResultSizeDataAccessException
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import org.springframework.util.IdGenerator
import java.util.*

@Repository
class BooksRepository(
    private val jdbcTemplate: NamedParameterJdbcTemplate,
    private val idGenerator: IdGenerator
) {

    private val log = getLogger(javaClass)

    fun create(book: Book): BookRecord {
        val id = idGenerator.generateId()
        val statement = "INSERT INTO book_records (id, title, isbn) VALUES (:id, :title, :isbn)"
        val parameters = mutableMapOf(
            "id" to id.toString(),
            "title" to book.title,
            "isbn" to book.isbn
        )

        return try {
            jdbcTemplate.update(statement, parameters)
            BookRecord(id, book)
        } catch (e: DuplicateKeyException) {
            log.warn("ID collision occurred for ID [{}] - retrying with new ID", id)
            create(book)
        }
    }

    fun update(bookRecord: BookRecord): Boolean {
        val query = "UPDATE book_records SET title = :title, isbn = :isbn WHERE id = :id"
        val parameters = mutableMapOf(
            "id" to bookRecord.id.toString(),
            "title" to bookRecord.book.title,
            "isbn" to bookRecord.book.isbn
        )

        return jdbcTemplate.update(query, parameters) != 0
    }

    fun findBy(id: UUID): BookRecord? {
        val query = "SELECT * FROM book_records WHERE id = :id"
        val parameters = mapOf("id" to id.toString())

        val rowMapper = RowMapper { rs, _ ->
            val title = rs.getString("title")!!
            val isbn = rs.getString("isbn")
            BookRecord(id, Book(title, isbn))
        }

        return try {
            jdbcTemplate.queryForObject(query, parameters, rowMapper)
        } catch (e: IncorrectResultSizeDataAccessException) {
            null
        }
    }

    fun deleteBy(id: UUID): Boolean {
        val query = "DELETE FROM book_records WHERE id = :id"
        val parameters = mapOf("id" to id.toString())

        return jdbcTemplate.update(query, parameters) != 0
    }

}
