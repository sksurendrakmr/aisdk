"use client";
import { useCompletion } from "@ai-sdk/react";
import { FormEvent } from "react";

/**
 * completion -> Its value automatically updates as new chunks arrive from the server.
 * We don't have to manually handle the stream or update state. The hook does it for us.
 *
 * This implementation will improve user experience where user not have to wait for the
 * entire response before seeing the text.
 */

export default function StreamPage() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
    setInput,
    stop, // For really long responses, user might want to stop the generation. This stop() can be used to abort current api request.
  } = useCompletion({
    api: "/api/stream",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    handleSubmit(e);
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      {isLoading && !completion && <div>Loading...</div>}
      {completion && <div>{completion}</div>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />;
        {isLoading ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button type="submit" disabled={isLoading}></button>
        )}
      </form>
    </>
  );
}
