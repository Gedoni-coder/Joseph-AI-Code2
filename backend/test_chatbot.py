#!/usr/bin/env python
import os
import sys
import django

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SECRET_KEY', 'test-key')
os.environ.setdefault('GEMINI_API_KEY', 'AIzaSyAgu7GrgqBUr7eqTulLLvDlpWPQf2S8bPo')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

def test_gemini_api():
    """Test if the Gemini API is working properly"""
    try:
        import google.generativeai as genai
        from django.conf import settings
        
        print(f"Testing with API Key: {settings.GEMINI_API_KEY[:10]}...")
        
        # Configure Gemini API
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Test with a simple prompt
        test_prompt = "Hello! I'm Joseph AI. Please respond with a brief greeting."
        response = model.generate_content(test_prompt)
        
        print("✅ Gemini API Test Successful!")
        print(f"Response: {response.text}")
        return True
        
    except Exception as e:
        print(f"❌ Gemini API Test Failed: {e}")
        return False

def test_chatbot_views():
    """Test the chatbot views"""
    try:
        from chatbot.views import generate_response
        from django.test import RequestFactory
        from rest_framework.response import Response
        import json
        
        # Create a test request
        factory = RequestFactory()
        test_data = {
            'messages': [
                {'type': 'user', 'content': 'Hello, can you help me with business forecasting?'}
            ],
            'context': 'business-forecast',
            'currentData': {}
        }
        
        request = factory.post('/chatbot/generate/', 
                             data=json.dumps(test_data), 
                             content_type='application/json')
        request.data = test_data
        
        response = generate_response(request)
        
        if isinstance(response, Response):
            print("✅ Chatbot View Test Successful!")
            response_data = response.data
            print(f"Response content: {response_data.get('response', 'No response')[:100]}...")
            return True
        else:
            print(f"❌ Chatbot View Test Failed: Invalid response type: {type(response)}")
            print(f"Response: {response}")
            return False
            
    except Exception as e:
        print(f"❌ Chatbot View Test Failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("🚀 Testing Joseph AI Chatbot Module...")
    print("="*50)
    
    # Test 1: Gemini API
    print("\n1. Testing Gemini API Connection:")
    api_test = test_gemini_api()
    
    # Test 2: Chatbot Views
    print("\n2. Testing Chatbot Views:")
    view_test = test_chatbot_views()
    
    print("\n" + "="*50)
    if api_test and view_test:
        print("🎉 All tests passed! The chatbot module is working properly.")
    else:
        print("⚠️  Some tests failed. Please check the error messages above.")