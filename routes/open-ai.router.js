async function routes(fastify, options) {
  fastify.get("/generate", async (request, reply) => {
    const prompt = request.query.prompt || "Once upon a time,";

    try {
      const response = await fastify.openai.completions.create({
        model: 'davinci',
        prompt: prompt,
        max_tokens: 150,
      });

      reply.send(response);
    } catch (error) {
      console.error("Error generating text:", error);
      reply.status(500).send("Error generating text");
    }
  });
}

export default routes;
