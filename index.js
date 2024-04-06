const OpenAI = require('openai');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const openai = new OpenAI({
  apiKey: "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" 
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a friendly chatbot."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 512,
            temperature: 0,
        });

        console.log(completion); // Log the completion object
        if (completion.choices && completion.choices.length > 0) {
            const text = completion.choices[0].message.content;
            res.send(text);
        } else {
            res.status(500).send("Unexpected response from OpenAI API");
        }
    } catch (error) {
        console.error("Error from OpenAI API:", error);
        res.status(500).send("Error from OpenAI API");
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
