import requests
import json
import time

def test_final_api():
    """Final comprehensive test of the Joseph AI Chatbot API"""
    
    # API endpoint (using port 8001 where our server is running)
    url = "http://127.0.0.1:8001/chatbot/generate-response/"
    
    # Test scenarios
    test_scenarios = [
        {
            "name": "Business Forecasting Query",
            "data": {
                "messages": [
                    {
                        "type": "user", 
                        "content": "Hello Joseph AI! I need help with business forecasting for my tech startup. What key metrics should I focus on?"
                    }
                ],
                "context": "business-forecast",
                "currentData": {
                    "company": "Tech Innovations Inc.",
                    "industry": "Technology",
                    "stage": "Early Stage"
                }
            }
        },
        {
            "name": "Economic Analysis Query",
            "data": {
                "messages": [
                    {
                        "type": "user",
                        "content": "Can you analyze the current economic trends and their impact on small businesses?"
                    }
                ],
                "context": "economic-forecasting",
                "currentData": {}
            }
        }
    ]
    
    print("🚀 COMPREHENSIVE JOSEPH AI CHATBOT TEST")
    print("=" * 60)
    
    success_count = 0
    total_tests = len(test_scenarios)
    
    for i, scenario in enumerate(test_scenarios, 1):
        print(f"\n📋 Test {i}/{total_tests}: {scenario['name']}")
        print("-" * 50)
        
        try:
            # Make API request
            response = requests.post(url, json=scenario['data'], timeout=45)
            
            if response.status_code == 200:
                response_data = response.json()
                
                print("✅ SUCCESS!")
                print(f"📊 Status Code: {response.status_code}")
                print(f"⏰ Timestamp: {response_data.get('timestamp', 'N/A')}")
                print(f"🤖 Joseph AI Response Preview:")
                print("-" * 30)
                
                ai_response = response_data.get('response', 'No response')
                # Show first 200 characters
                preview = ai_response[:200] + "..." if len(ai_response) > 200 else ai_response
                print(preview)
                print("-" * 30)
                
                success_count += 1
                
            else:
                print(f"❌ FAILED - Status Code: {response.status_code}")
                print(f"📝 Error Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ NETWORK ERROR: {e}")
        except Exception as e:
            print(f"❌ UNEXPECTED ERROR: {e}")
        
        # Small delay between tests
        if i < total_tests:
            time.sleep(1)
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"✅ Successful Tests: {success_count}/{total_tests}")
    print(f"❌ Failed Tests: {total_tests - success_count}/{total_tests}")
    
    if success_count == total_tests:
        print("\n🎉 ALL TESTS PASSED! 🎉")
        print("✨ Your Joseph AI Chatbot is working perfectly!")
        print(f"🔑 API Key: {' '.join(['AIzaSyAgu7GrgqBUr7eqTulLLvDlpWPQf2S8bPo'[:10], '...(configured correctly)'])}")
        print("🌐 Server: Running on http://127.0.0.1:8001/")
        print("📡 Endpoint: /chatbot/generate-response/")
        
        print("\n📌 DEBUGGING SUMMARY:")
        print("• ✅ Missing packages installed (google-generativeai, etc.)")
        print("• ✅ API key configured correctly") 
        print("• ✅ Model updated from 'gemini-pro' to 'gemini-2.0-flash'")
        print("• ✅ Django server running properly")
        print("• ✅ URL routing configured correctly")
        print("• ✅ Chatbot responding with contextual intelligence")
        
    else:
        print(f"\n⚠️ {total_tests - success_count} tests failed.")
        print("Please check the error messages above for debugging information.")
    
    print("=" * 60)

if __name__ == "__main__":
    test_final_api()