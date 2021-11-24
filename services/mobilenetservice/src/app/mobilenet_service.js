const EventProducer = require('@katanaml/skipper-lib-js/skipper/events/event_producer')

var RABBITMQ_USER = process.env.RABBITMQ_USER;
if (!process.env.RABBITMQ_USER) {
    RABBITMQ_USER = 'skipper';
}
var RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
if (!process.env.RABBITMQ_PASSWORD) {
    RABBITMQ_PASSWORD = 'welcome1';
}
var RABBITMQ_HOST = process.env.RABBITMQ_HOST;
if (!process.env.RABBITMQ_HOST) {
    RABBITMQ_HOST = '127.0.0.1';
}
var RABBITMQ_PORT = process.env.RABBITMQ_PORT;
if (!process.env.RABBITMQ_PORT) {
    RABBITMQ_PORT = 5672;
}

var QUEUE_NAME_DATA = process.env.QUEUE_NAME_DATA;
if (!process.env.QUEUE_NAME_DATA) {
    QUEUE_NAME_DATA = 'skipper_data';
}
var SERVICE_NAME = process.env.SERVICE_NAME;
if (!process.env.SERVICE_NAME) {
    SERVICE_NAME = 'mobilenet';
}
var LOGGER_RECEIVER_URL = process.env.LOGGER_RECEIVER_URL;
if (!process.env.LOGGER_RECEIVER_URL) {
    LOGGER_RECEIVER_URL = 'http://127.0.0.1:5001/api/v1/skipper/logger/log_receiver';
}

class MobilenetService {
    constructor() { }

    call(data) {
        const input = JSON.parse(data);
        console.log(input);

        // Sample call to verify if it works to call Python container
        // from JS container through RabbitMQ
        var event_producer = new EventProducer(
            RABBITMQ_USER,
            RABBITMQ_PASSWORD,
            RABBITMQ_HOST,
            RABBITMQ_PORT);

        var data = {
            'task_type': 'training',
            'payload': '0.2',
            'description': 'string'
        }
        data = JSON.stringify(data);
        event_producer.call(this.processResponse, data, LOGGER_RECEIVER_URL, QUEUE_NAME_DATA, SERVICE_NAME);
        //

        const response = {
            'status': 'OK'
        }

        return [JSON.stringify(response), input.task_type];
    }

    processResponse(data) {
        const input = JSON.parse(data);
        console.log('Number of keys in JSON structure from Boston data service: ' + Object.keys(input).length);
    }
}

module.exports = MobilenetService