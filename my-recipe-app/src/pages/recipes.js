import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";

const RecipeWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8efff 100%);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const RecipeCard = styled.div`
  margin-bottom: 30px;
  padding: 25px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    color: #663399;
    font-size: 24px;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }
`;

const IngredientsList = styled.ul`
  margin-top: 5px;
  padding-left: 20px;
  list-style-type: disc;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;

  li {
    font-size: 16px;
    color: #444;
    margin-bottom: 5px;
  }
`;

const StepsList = styled.ol`
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: decimal;
  background: #f3f0ff;
  padding: 15px;
  border-left: 4px solid #663399;
  border-radius: 8px;

  li {
    font-size: 16px;
    color: #444;
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const RecipePage = ({ data }) => {
  const recipes = data.allContentfulRecipe.nodes;

  return (
    <Layout>
      <RecipeWrapper>
        <h1 style={{ textAlign: "center", color: "#663399", fontSize: "32px" }}>
          Delicious Recipes 🍽️
        </h1>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.title}>
            <h2>{recipe.title}</h2>

            {recipe.ingredients && (
              <div>
                <strong style={{ color: "#663399" }}>Ingredients:</strong>
                <IngredientsList>
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </IngredientsList>
              </div>
            )}

            {recipe.steps && recipe.steps.steps && (
              <div>
                <strong style={{ color: "#663399" }}>Steps:</strong>
                <StepsList>
                  {recipe.steps.steps.split(". ").map((step, index) => (
                    <li key={index}>{step.trim()}.</li>
                  ))}
                </StepsList>
              </div>
            )}
          </RecipeCard>
        ))}
      </RecipeWrapper>
    </Layout>
  );
};

export const query = graphql`
  query {
    allContentfulRecipe {
      nodes {
        title
        ingredients
        steps {
          steps
        }
      }
    }
  }
`;

export default RecipePage;


