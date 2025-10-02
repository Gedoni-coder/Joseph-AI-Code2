import requests
import json

def test_chatbot_api():
    """Test the chatbot API endpoint"""
    
    # API endpoint
    url = "http://127.0.0.1:8000/chatbot/generate-response/"
    
    # Test data
    test_data = {
        "messages": [
            {
                "type": "user", 
                "content": "Hello Joseph AI! Can you help me with business forecasting? I want to understand the key factors to consider."
            }
        ],
        "context": "business-forecast",
        "currentData": {
            "company": "Test Corp",
            "industry": "Technology"
        }
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        print("🚀 Testing Joseph AI Chatbot API Endpoint...")
        print(f"📡 Sending request to: {url}")
        print(f"📋 Test data: {json.dumps(test_data, indent=2)}")
        print("-" * 50)
        
        # Make the API request
        response = requests.post(url, json=test_data, headers=headers, timeout=30)
        
        if response.status_code == 200:
            response_data = response.json()
            
            print("✅ API Request Successful!")
            print(f"📊 Status Code: {response.status_code}")
            print(f"⏰ Timestamp: {response_data.get('timestamp', 'N/A')}")
            print(f"🤖 Joseph AI Response:")
            print("-" * 30)
            print(response_data.get('response', 'No response'))
            print("-" * 30)
            return True
            
        else:
            print(f"❌ API Request Failed!")
            print(f"📊 Status Code: {response.status_code}")
            print(f"📝 Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🎯 JOSEPH AI CHATBOT API TEST")
    print("=" * 60)
    
    success = test_chatbot_api()
    
    print("\n" + "=" * 60)
    if success:
        print("🎉 Test completed successfully! The chatbot API is working properly.")
        print("✨ Your API key is configured correctly and Joseph AI is responsive.")
    else:
        print("⚠️ Test failed. Please check the error messages above.")
        print("💡 Make sure the Django server is running on http://127.0.0.1:8000/")
    print("=" * 60)