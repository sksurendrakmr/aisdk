"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react"; //To get structured data
import { recipeSchema } from "@/app/api/structured-data/Schema";

export default function StructuredDataPage() {
  const [dish, setDish] = useState("second");
  /**
   * object contains the structured recipe data which we can render on the UI
   */
  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ dish });
    setDish("");
  };
  return (
    <>
      {object?.recipe && (
        <div>
          <h2>{object.recipe.name}</h2>
          {object?.recipe?.ingredients && (
            <div>
              <h3>Ingredients</h3>
              <div>
                {object.recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <p>{ingredient?.name}</p>
                    <p>{ingredient?.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
          <button type="submit">Generate</button>
        </div>
      </form>
    </>
  );
}
