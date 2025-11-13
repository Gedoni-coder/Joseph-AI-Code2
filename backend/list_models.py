#!/usr/bin/env python
import google.generativeai as genai

# Configure API
genai.configure(api_key='AIzaSyAgu7GrgqBUr7eqTulLLvDlpWPQf2S8bPo')

print("Available Gemini models:")
print("=" * 30)

try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"✅ {model.name}")
except Exception as e:
    print(f"Error listing models: {e}")