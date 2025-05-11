const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Kafka } = require("kafkajs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const kafka = new Kafka({ clientId: "chat-ui", brokers: ["localhost:10000"] });
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "chat-group-ui" });

let latestBotMessages = []; // 메시지를 메모리에 저장

(async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: "chat_output", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const msg = JSON.parse(message.value.toString());
            latestBotMessages.push(msg);
        },
    });
})();

// 사용자 메시지 → Kafka 전송
app.post("/api/send", async (req, res) => {
    const msg = req.body;
    await producer.send({
        topic: "chat_input",
        messages: [{ value: JSON.stringify(msg) }],
    });
    res.send({ status: "ok" });
});

// 봇 응답 메시지 가져오기 (Polling용)
app.get("/api/messages", (req, res) => {
    const messages = [...latestBotMessages];
    latestBotMessages = []; // 가져간 건 비움
    res.json(messages);
});

app.listen(PORT, () => {
    console.log(`✅ Kafka Gateway listening on http://localhost:${PORT}`);
});