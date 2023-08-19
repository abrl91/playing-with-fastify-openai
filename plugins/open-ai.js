import fastifyPlugin from "fastify-plugin";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openaiPlugin = async (fastify, options) => {
  try {
    const openaiInstance = new OpenAI({
      api_key: OPENAI_API_KEY,
    });

    fastify.decorate("openai", openaiInstance);
  } catch (err) {
    console.log("Error initializing OpenAI:", err);
    throw err;
  }
};

export default fastifyPlugin(openaiPlugin, {
  name: "openai-plugin",
});
