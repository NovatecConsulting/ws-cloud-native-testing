package rabbitmq.messaging

import com.ninjasquad.springmockk.SpykBean
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.ImportAutoConfiguration
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.ComponentScan
import rabbitmq.books.Examples
import rabbitmq.books.createdEvent
import rabbitmq.books.deletedEvent
import rabbitmq.events.EventHandler
import rabbitmq.events.PublishEventFunction
import rabbitmq.utils.RabbitMQExtension

@ExtendWith(RabbitMQExtension::class)
@SpringBootTest(
    classes = [MessagingIntegrationTestsConfiguration::class],
    properties = ["spring.rabbitmq.port=\${RABBIT_MQ_PORT}"]
)
@SpykBean(EventHandler::class, DeadLetterHandler::class)
internal class MessagingIntegrationTests(
    @Autowired val eventHandler: EventHandler,
    @Autowired val deadLetterHandler: DeadLetterHandler,
    @Autowired val publishEvent: PublishEventFunction,
    @Autowired val rabbitTemplate: RabbitTemplate
) {

    val createdEvent = Examples.cleanCode.createdEvent()
    val deletedEvent = Examples.cleanCode.deletedEvent()

    @Test
    fun `book created events are dispatched and received`() {
        publishEvent(createdEvent)
        verify(timeout = 1_000) { eventHandler.handleCreatedEvent(createdEvent) }
    }

    @Test
    fun `book deleted events are dispatched and received`() {
        publishEvent(deletedEvent)
        verify(timeout = 1_000) { eventHandler.handleDeletedEvent(deletedEvent) }
    }

    @Test // needs to be configured via application properties
    fun `dead letter queue is used in case of an exception`() {
        every { eventHandler.handleDeletedEvent(deletedEvent) } throws RuntimeException("oops")
        publishEvent(deletedEvent)
        verify(timeout = 1_000) { eventHandler.handleDeletedEvent(deletedEvent) }
        verify(timeout = 1_000) { deadLetterHandler.handleDeadLetter(any()) }
    }

    @Test // works by default
    fun `dead letter queue is used in case a message cannot be read`() {
        manuallySendEventMessage("book-created", DummyEvent("bar"))
        verify(timeout = 1_000) { deadLetterHandler.handleDeadLetter(any()) }
    }

    fun manuallySendEventMessage(routingKey: String, event: Any) =
        rabbitTemplate.convertAndSend("exchanges.events", routingKey, event)

    data class DummyEvent(val foo: String)
}

@ComponentScan
@ImportAutoConfiguration(RabbitAutoConfiguration::class)
private class MessagingIntegrationTestsConfiguration {
}
