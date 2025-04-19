// import { createClient } from 'npm:@supabase/supabase-js@2.39.7'
// import { GoogleGenerativeAI } from 'npm:@google/generative-ai@0.2.1'

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
//   'Access-Control-Allow-Methods': 'POST, OPTIONS',
// }

// interface RequestBody {
//   skinType: string;
//   concerns: string[];
//   allergens: string[];
// }

// interface RecommendationResponse {
//   products: Array<{
//     name: string;
//     description: string;
//     why: string;
//     rating: string;
//   }>;
//   harmful_crops: Array<{
//     name: string;
//     reason: string;
//     rating: string;
//   }>;
//   harmful_pesticides: Array<{
//     name: string;
//     reason: string;
//     rating: string;
//   }>;
// }

// Deno.serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response(null, {
//       headers: corsHeaders,
//       status: 204,
//     });
//   }

//   try {
//     if (req.method !== 'POST') {
//       return new Response(JSON.stringify({ error: 'Method not allowed' }), {
//         status: 405,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//       });
//     }

//     let requestBody: RequestBody;
//     try {
//       requestBody = await req.json();
//     } catch (error) {
//       console.error('Failed to parse request body:', error);
//       return new Response(
//         JSON.stringify({ error: 'Invalid request body format' }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     const { skinType, concerns, allergens } = requestBody;

//     if (!skinType || !Array.isArray(concerns) || !Array.isArray(allergens)) {
//       return new Response(
//         JSON.stringify({
//           error: 'Invalid input format',
//           details: {
//             skinType: !skinType ? 'Missing skin type' : null,
//             concerns: !Array.isArray(concerns) ? 'Concerns must be an array' : null,
//             allergens: !Array.isArray(allergens) ? 'Allergens must be an array' : null
//           }
//         }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     try {
//       console.log("hey");

//       const genAI = new GoogleGenerativeAI('AIzaSyCGHuzHn0nKcmmDeUtshJH32smNWDoQ75k');
//       const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//       const prompt = `You are a skincare expert specializing in agricultural workers' skin health. Based on the following information:

// Skin Type: \${skinType}
// Skin Concerns: \${concerns.join(', ')}
// Allergens: \${allergens.join(', ')}

// Provide comprehensive recommendations focusing on:
// 1. Specific skincare products suitable for agricultural work
// 2. Crops that might cause skin reactions
// 3. Pesticides to avoid for skin safety

// Format your response as a JSON object with this exact structure:
// {
//   "products": [
//     {
//       "name": "Product Name",
//       "description": "Detailed product description",
//       "why": "Specific reasons why this product is recommended for their case",
//       "rating": "Recommendation level from 0/10 (least) to 10/10 (highly recommended)"
//     }
//   ],
//   "harmful_crops": [
//     {
//       "name": "Crop Name",
//       "reason": "Detailed explanation of potential skin reactions",
//       "rating": "Risk level from 0/10 (least harmful) to 10/10 (most harmful)"
//     }
//   ],
//   "harmful_pesticides": [
//     {
//       "name": "Pesticide Name",
//       "reason": "Specific skin health risks and why to avoid",
//       "rating": "Risk level from 0/10 (least harmful) to 10/10 (most harmful)"
//     }
//   ]
// }

// Consider:
// - Work environment exposure
// - Sun protection needs
// - Moisture barriers
// - Skin sensitivity
// - Allergen avoidance
// - Professional-grade products
// - Long-wearing formulations

// Ensure recommendations are practical for agricultural work conditions.`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();

//       let recommendations: RecommendationResponse;
//       try {
//         const jsonMatch = text.match(/\{[\s\S]*\}/);
//         if (!jsonMatch) {
//           throw new Error('No valid JSON found in response');
//         }
//         recommendations = JSON.parse(jsonMatch[0]);
//         console.log(recommendations);

//         if (!recommendations.products || !recommendations.harmful_crops || !recommendations.harmful_pesticides) {
//           throw new Error('Invalid response structure');
//         }

//         if (recommendations.products.length === 0) {
//           recommendations.products = [{
//             name: 'Basic Protective Moisturizer',
//             description: 'A non-irritating, protective moisturizer suitable for agricultural work',
//             why: `Specially formulated for ${skinType} skin and outdoor work conditions`,
//             rating: "9/10"
//           }];
//         }
//         if (recommendations.harmful_crops.length === 0) {
//           recommendations.harmful_crops = [{
//             name: 'General Irritant Crops',
//             reason: 'Some crops may cause skin irritation due to their natural defense mechanisms',
//             rating: "6/10"
//           }];
//         }
//         if (recommendations.harmful_pesticides.length === 0) {
//           recommendations.harmful_pesticides = [{
//             name: 'Common Agricultural Pesticides',
//             reason: 'Many pesticides can cause skin irritation and should be handled with proper protection',
//             rating: "8/10"
//           }];
//         }
//       } catch (error) {
//         console.error('Failed to parse Gemini response:', error);
//         console.log('Raw Gemini response:', text);

//         recommendations = {
//           products: [
//             {
//               name: 'Heavy-Duty Moisturizer',
//               description: `Professional-grade moisturizer designed for ${skinType} skin`,
//               why: `Specifically formulated to address ${concerns.join(', ')} while providing long-lasting protection during fieldwork`,
//               rating: "10/10"
//             },
//             {
//               name: 'Protective Barrier Cream',
//               description: 'Creates a protective layer between skin and environmental factors',
//               why: 'Helps prevent irritation from agricultural exposures while maintaining skin health',
//               rating: "9/10"
//             },
//             {
//               name: 'Gentle Cleanser',
//               description: 'pH-balanced cleanser for thorough but gentle cleaning',
//               why: 'Removes agricultural residues without compromising skin barrier',
//               rating: "8/10"
//             }
//           ],
//           harmful_crops: [
//             {
//               name: 'Citrus Plants',
//               reason: 'Contains photosensitizing compounds that can cause skin reactions when exposed to sunlight',
//               rating: "9/10"
//             },
//             {
//               name: 'Nightshade Family Plants',
//               reason: 'Can cause contact dermatitis in sensitive individuals',
//               rating: "7/10"
//             }
//           ],
//           harmful_pesticides: [
//             {
//               name: 'Organophosphates',
//               reason: 'Known to cause skin irritation and potential systemic effects through skin absorption',
//               rating: "10/10"
//             },
//             {
//               name: 'Pyrethroid-based Pesticides',
//               reason: 'Can cause skin sensitization and allergic reactions',
//               rating: "8/10"
//             }
//           ]
//         };
//       }

//       return new Response(
//         JSON.stringify(recommendations),
//         {
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//           status: 200,
//         }
//       );
//     } catch (error) {
//       console.error('Gemini API error:', error);
//       return new Response(
//         JSON.stringify({
//           error: 'Failed to generate recommendations',
//           details: error.message
//         }),
//         {
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//           status: 500,
//         }
//       );
//     }
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return new Response(
//       JSON.stringify({
//         error: 'Internal server error',
//         details: error.message
//       }),
//       {
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         status: 500,
//       }
//     );
//   }
// });
