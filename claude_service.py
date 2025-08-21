import os
import asyncio
from anthropic import AsyncAnthropic
from dotenv import load_dotenv

load_dotenv()

class ClaudeService:
    def __init__(self):
        self.client = None
        self.is_available = False
        self._initialize()
    
    def _initialize(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if api_key:
            self.client = AsyncAnthropic(api_key=api_key)
            self.is_available = True
            print("✅ Claude hazır!")
        else:
            print("❌ API key eksik!")
    
    async def analyze_error(self, error_msg: str) -> str:
        if not self.is_available:
            return "Claude kullanılamıyor"
        
        try:
            response = await self.client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=500,
                messages=[{
                    "role": "user",
                    "content": f"Avukat Ajanda projesinde bu hata var: {error_msg}. Nasıl çözerim?"
                }]
            )
            return response.content[0].text
        except Exception as e:
            return f"Claude hatası: {str(e)}"

# Global instance
claude_service = ClaudeService()

if __name__ == "__main__":
    async def test():
        result = await claude_service.analyze_error("NameError: name 'get_current_active_user' is not defined")
        print(result)
    
    asyncio.run(test())
