import Fastify from "fastify";
import dbConnector from "./plugins/db-connector.js";
import openaiPlugin from "./plugins/open-ai.js";
import routes from "./routes/open-ai.router.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);
fastify.register(openaiPlugin).after((error) => {
  if (error) {
    console.error("Failed to register OpenAI plugin:", error);
    process.exit(1);
  }
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
