const prompt = {
  DESIGN_IDEA_PROMPT: `
    Based on Logo of type {logoType}, generate a text prompt to create a logo for
    Logo Title/Brand Name: {logoTitle}, with description: {logoDesc}, and referring to prompt: {logoPrompt}.
    Give me 4 or 5 suggestions of logo ideas (each idea with a maximum of 4-5 words).
    Result in JSON format.
  `
    .trim()
    .replace(/\s+/g, " "),

  LOGO_PROMPT: `
    Generate a text prompt to create a logo for
    Logo Title/Brand Name: {logoTitle}, with description: {logoDesc},
    with color combination of {logoColor}, and also include the {logoDesign} design idea.
    Give me the result in JSON format with a "prompt" field only.
  `
    .trim()
    .replace(/\s+/g, " "),
};

export default prompt;
