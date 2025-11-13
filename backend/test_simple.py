import time
import subprocess
import json

def test_with_curl():
    """Test the chatbot API using curl"""
    
    # Wait a moment to ensure server is fully started
    time.sleep(2)
    
    # Test data
    test_data = {
        "messages": [
            {
                "type": "user", 
                "content": "Hello Joseph AI! Can you help me with business forecasting?"
            }
        ],
        "context": "business-forecast",
        "currentData": {}
    }
    
    # Convert to JSON string for curl
    json_data = json.dumps(test_data)
    
    # Curl command
    curl_command = [
        "curl",
        "-X", "POST",
        "-H", "Content-Type: application/json",
        "-d", json_data,
        "http://127.0.0.1:8000/chatbot/generate-response/",
        "--connect-timeout", "30",
        "--max-time", "60"
    ]
    
    try:
        print("🚀 Testing Joseph AI Chatbot with curl...")
        print(f"📡 URL: http://127.0.0.1:8000/chatbot/generate-response/")
        print("-" * 50)
        
        # Execute curl command
        result = subprocess.run(curl_command, capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            print("✅ Curl request successful!")
            print("📝 Response:")
            print(result.stdout)
        else:
            print("❌ Curl request failed!")
            print(f"Return code: {result.returncode}")
            print(f"Error: {result.stderr}")
            
    except subprocess.TimeoutExpired:
        print("❌ Request timed out!")
    except FileNotFoundError:
        print("❌ Curl command not found. Testing without curl...")
        return test_simple()
    except Exception as e:
        print(f"❌ Error: {e}")

def test_simple():
    """Simple Python requests test"""
    import requests
    import json
    
    url = "http://127.0.0.1:8000/chatbot/generate-response/"
    
    test_data = {
        "messages": [{"type": "user", "content": "Hello Joseph AI!"}],
        "context": "business-forecast",
        "currentData": {}
    }
    
    try:
        print("🚀 Testing with Python requests...")
        response = requests.post(url, json=test_data, timeout=30)
        
        if response.status_code == 200:
            print("✅ Request successful!")
            print("📝 Response:")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"❌ Request failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("🎯 JOSEPH AI CHATBOT API TEST")
    print("=" * 60)
    test_with_curl()
    print("=" * 60)