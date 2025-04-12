# ai_threat_hunting.py

import openai

def predict_threat_behavior(threat_description):
    prompt = f"Analyze this security threat and predict possible next attack vectors: {threat_description}"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

# Example usage
if __name__ == "__main__":
    description = "SQL Injection detected on login page"
    prediction = predict_threat_behavior(description)
    print(f"Predicted Next Steps: {prediction}")
