package contracts.consumer_one.scc

import org.springframework.cloud.contract.spec.ContractDsl.Companion.contract
import org.springframework.cloud.contract.spec.internal.RegexPatterns.nonBlank

// different variants on the same interaction

arrayOf(
    contract {
        // will match responses exactly based on equality of any defined properties
        name = "get single book by id - strict"
        request {
            method = GET
            urlPath = path("/books/b3fc0be8-463e-4875-9629-67921a1e00f4")
            headers {
                accept = APPLICATION_JSON
                authorization = v(c(nonBlank()), p(execute("validAuthHeader()")))
            }
        }
        response {
            status = OK
            headers {
                contentType = APPLICATION_JSON
            }
            body = body(
                """
                {
                  "isbn": "9780132350884",
                  "title": "Clean Code",
                  "authors": [
                    "Robert C. Martin",
                    "Dean Wampler"
                  ]
                }
                """
            )
        }
    },
    contract {
        // will match responses by type and regex with examples for consumer stubs
        name = "get single book by id - relaxed 1"
        request {
            method = GET
            urlPath = path("/books/b3fc0be8-463e-4875-9629-67921a1e00f4")
            headers {
                accept = APPLICATION_JSON
                authorization = v(c(nonBlank()), p(execute("validAuthHeader()")))
            }
        }
        response {
            status = OK
            headers {
                contentType = APPLICATION_JSON
            }
            body = body(
                "isbn" to v(c("9780132350884"), p(regex("""\d{10}|\d{13}"""))),
                "title" to v(c("Clean Code"), p(anyNonBlankString)),
                "authors" to listOf(
                    v(c("Robert C. Martin"), p(anyNonBlankString)),
                    v(c("Dean Wampler"), p(anyNonBlankString))
                )
            )
        }
    },
    contract {
        // will match responses by type and regex with examples for consumer stubs but slightly different config
        name = "get single book by id - relaxed 2"
        request {
            method = GET
            urlPath = path("/books/b3fc0be8-463e-4875-9629-67921a1e00f4")
            headers {
                accept = APPLICATION_JSON
                authorization = v(c(nonBlank()), p(execute("validAuthHeader()")))
            }
        }
        response {
            status = OK
            headers {
                contentType = APPLICATION_JSON
            }
            body = body(
                "isbn" to v(c("9780132350884"), p(regex("""\d{10}|\d{13}"""))),
                "title" to v(c("Clean Code"), p(anyNonBlankString)),
                "authors" to listOf("Robert C. Martin", "Dean Wampler")
            )
            bodyMatchers {
                jsonPath("$.authors", byType { minOccurrence(1) })
                jsonPath("$.authors[0]", byType)
            }
        }
    }
)
