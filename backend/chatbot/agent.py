import asyncio
import json
import logging
import threading
import time
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import requests
from django.conf import settings
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = ("You are a Business, Macro and Micro Economist, serving this business, and ensuring they are always understanding and making right decisions")

class AutonomousAgent:
    """
    Autonomous AI Agent that operates behind the scenes to handle information retrieval,
    web search, processing, delivery, user requests, and auto-updating of modules.
    """

    def __init__(self):
        self.is_running = False
        self.thread = None
        self.last_update = {}
        self.module_endpoints = {
            'economic_forecast': 'http://localhost:8000/economic_forecast/',
            'business_forecast': 'http://localhost:8000/business_forecast/',
            'financial_advisory': 'http://localhost:8000/financial_advisory/',
            'inventory_supply_chain': 'http://localhost:8000/inventory_supply_chain/',
            'loan_funding': 'http://localhost:8000/loan_funding/',
            'market_analysis': 'http://localhost:8000/market_analysis/',
            'policy': 'http://localhost:8000/policy/',
            'pricing_strategy': 'http://localhost:8000/pricing_strategy/',
            'revenue_strategy': 'http://localhost:8000/revenue_strategy/',
            'tax_compliance': 'http://localhost:8000/tax_compliance/',
        }
        self.agent_memory = {}
        self.pending_tasks = []
        self.completed_tasks = []

    def start(self):
        """Start the autonomous agent in a background thread."""
        if not self.is_running:
            self.is_running = True
            self.thread = threading.Thread(target=self._run_agent_loop, daemon=True)
            self.thread.start()
            logger.info("Autonomous Agent started")

    def stop(self):
        """Stop the autonomous agent."""
        self.is_running = False
        if self.thread:
            self.thread.join(timeout=5)
        logger.info("Autonomous Agent stopped")

    def get_status(self) -> Dict[str, Any]:
        """Get the current status of the agent."""
        return {
            'is_running': self.is_running,
            'last_updates': self.last_update,
            'pending_tasks': len(self.pending_tasks),
            'completed_tasks': len(self.completed_tasks),
            'memory_size': len(self.agent_memory)
        }

    def add_task(self, task: Dict[str, Any]):
        """Add a task to the agent's queue."""
        self.pending_tasks.append({
            'id': f"task_{int(time.time())}_{len(self.pending_tasks)}",
            'task': task,
            'timestamp': datetime.now(),
            'status': 'pending'
        })

    def _run_agent_loop(self):
        """Main agent loop that runs in background thread."""
        while self.is_running:
            try:
                # Process pending tasks
                self._process_pending_tasks()

                # Auto-update modules
                self._auto_update_modules()

                # Handle information retrieval and processing
                self._handle_information_processing()

                # Sleep for a short interval
                time.sleep(30)  # Check every 30 seconds

            except Exception as e:
                logger.error(f"Agent loop error: {e}")
                time.sleep(60)  # Wait longer on error

    def _process_pending_tasks(self):
        """Process tasks in the pending queue."""
        if not self.pending_tasks:
            return

        # Process one task at a time to avoid overwhelming the system
        task_data = self.pending_tasks.pop(0)
        task = task_data['task']

        try:
            result = self._execute_task(task)
            task_data['status'] = 'completed'
            task_data['result'] = result
            task_data['completed_at'] = datetime.now()
            self.completed_tasks.append(task_data)

            # Keep only last 100 completed tasks
            if len(self.completed_tasks) > 100:
                self.completed_tasks = self.completed_tasks[-100:]

        except Exception as e:
            logger.error(f"Task execution failed: {e}")
            task_data['status'] = 'failed'
            task_data['error'] = str(e)
            task_data['completed_at'] = datetime.now()
            self.completed_tasks.append(task_data)

    def _execute_task(self, task: Dict[str, Any]) -> Any:
        """Execute a specific task."""
        task_type = task.get('type', '')

        if task_type == 'web_search':
            return self._perform_web_search(task.get('query', ''))
        elif task_type == 'information_retrieval':
            return self._retrieve_information(task.get('source', ''), task.get('query', ''))
        elif task_type == 'module_update':
            return self._update_module_data(task.get('module', ''), task.get('data', {}))
        elif task_type == 'user_request':
            return self._handle_user_request(task.get('request', ''), task.get('context', {}))
        elif task_type == 'data_analysis':
            return self._analyze_data(task.get('data', {}), task.get('analysis_type', ''))
        else:
            return self._process_general_task(task)

    def _perform_web_search(self, query: str) -> Dict[str, Any]:
        """Perform web search using available tools."""
        # For now, use a simple approach. In production, integrate with search APIs
        try:
            # This is a placeholder - in real implementation, use Google Search API or similar
            search_results = {
                'query': query,
                'results': [
                    {
                        'title': f'Search result for {query}',
                        'url': f'https://example.com/search/{query.replace(" ", "_")}',
                        'snippet': f'Information about {query} retrieved from web search.'
                    }
                ],
                'timestamp': datetime.now().isoformat()
            }

            # Store in agent memory
            self.agent_memory[f'search_{query}'] = search_results
            return search_results

        except Exception as e:
            logger.error(f"Web search failed: {e}")
            return {'error': str(e)}

    def _retrieve_information(self, source: str, query: str) -> Dict[str, Any]:
        """Retrieve information from specified source."""
        try:
            if source in self.module_endpoints:
                # Retrieve from internal API
                response = requests.get(f"{self.module_endpoints[source]}?q={query}")
                if response.status_code == 200:
                    data = response.json()
                    self.agent_memory[f'info_{source}_{query}'] = data
                    return data
                else:
                    return {'error': f'API request failed: {response.status_code}'}
            else:
                # External information retrieval
                return self._perform_web_search(f"{source} {query}")

        except Exception as e:
            logger.error(f"Information retrieval failed: {e}")
            return {'error': str(e)}

    def _update_module_data(self, module: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update data in a specific module."""
        try:
            if module in self.module_endpoints:
                # Post data to module API
                response = requests.post(
                    self.module_endpoints[module],
                    json=data,
                    headers={'Content-Type': 'application/json'}
                )

                result = {
                    'module': module,
                    'success': response.status_code in [200, 201],
                    'status_code': response.status_code,
                    'timestamp': datetime.now().isoformat()
                }

                if response.status_code in [200, 201]:
                    self.last_update[module] = datetime.now()

                return result
            else:
                return {'error': f'Unknown module: {module}'}

        except Exception as e:
            logger.error(f"Module update failed: {e}")
            return {'error': str(e)}

    def _handle_user_request(self, request: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Handle user requests autonomously."""
        try:
            # Use Gemini AI to process the request
            prompt = f"""
            {SYSTEM_PROMPT}

            You are Joseph AI, an autonomous agent. Process this user request: "{request}"

            Context: {json.dumps(context)}

            Determine what actions to take:
            1. If this requires information retrieval, specify what to search for
            2. If this requires updating module data, specify which module and what data
            3. If this requires analysis, specify the type of analysis needed
            4. Provide a response to the user

            Respond in JSON format with keys: actions, response
            """

            response = model.generate_content(prompt)
            result = json.loads(response.text.strip())

            # Execute determined actions
            if 'actions' in result:
                for action in result['actions']:
                    self.add_task(action)

            return result

        except Exception as e:
            logger.error(f"User request handling failed: {e}")
            return {'error': str(e), 'response': 'I encountered an error processing your request.'}

    def _analyze_data(self, data: Dict[str, Any], analysis_type: str) -> Dict[str, Any]:
        """Analyze data using AI."""
        try:
            prompt = f"""
            {SYSTEM_PROMPT}

            Analyze this data: {json.dumps(data)}

            Analysis type: {analysis_type}

            Provide insights, trends, and recommendations based on the data.
            """

            response = model.generate_content(prompt)
            analysis = response.text.strip()

            result = {
                'analysis_type': analysis_type,
                'insights': analysis,
                'timestamp': datetime.now().isoformat()
            }

            # Store analysis in memory
            self.agent_memory[f'analysis_{analysis_type}_{datetime.now().isoformat()}'] = result
            return result

        except Exception as e:
            logger.error(f"Data analysis failed: {e}")
            return {'error': str(e)}

    def _process_general_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Process general tasks using AI reasoning."""
        try:
            prompt = f"""
            {SYSTEM_PROMPT}

            Process this task: {json.dumps(task)}

            As an autonomous agent, determine what actions to take and provide a response.
            """

            response = model.generate_content(prompt)
            return {
                'task': task,
                'result': response.text.strip(),
                'timestamp': datetime.now().isoformat()
            }

        except Exception as e:
            logger.error(f"General task processing failed: {e}")
            return {'error': str(e)}

    def _auto_update_modules(self):
        """Automatically update modules with fresh data."""
        # Check if modules need updating (every 6 hours)
        update_interval = timedelta(hours=6)

        for module, endpoint in self.module_endpoints.items():
            last_update = self.last_update.get(module)
            if not last_update or datetime.now() - last_update > update_interval:
                try:
                    # Generate update task
                    update_task = {
                        'type': 'module_update',
                        'module': module,
                        'data': {
                            'auto_update': True,
                            'timestamp': datetime.now().isoformat(),
                            'source': 'autonomous_agent'
                        }
                    }
                    self.add_task(update_task)

                except Exception as e:
                    logger.error(f"Auto-update failed for {module}: {e}")

    def _handle_information_processing(self):
        """Handle ongoing information processing tasks."""
        # Check for information that needs processing
        try:
            # Look for unprocessed information in memory
            unprocessed_keys = [k for k in self.agent_memory.keys() if k.startswith('search_') and not k.endswith('_processed')]

            for key in unprocessed_keys:
                search_data = self.agent_memory[key]

                # Process search results
                processing_task = {
                    'type': 'data_analysis',
                    'data': search_data,
                    'analysis_type': 'search_results_processing'
                }
                self.add_task(processing_task)

                # Mark as processed
                self.agent_memory[f"{key}_processed"] = True

        except Exception as e:
            logger.error(f"Information processing failed: {e}")

# Global agent instance
agent = AutonomousAgent()
