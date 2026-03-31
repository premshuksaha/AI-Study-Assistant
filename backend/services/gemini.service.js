const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const generateContent = async (prompt) => {
    try {
        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt }
                    ]
                }]
            })
        })
        if (!response.ok) {        
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const text = data.candidates[0].content.parts[0].text;

        if (!text) {
            throw new Error('No text found in the response');
        }
        const cleanedText = text.replace(/```json/g, '')
                                .replace(/```/g, '')
                                .trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};

module.exports = {
    generateContent,
};