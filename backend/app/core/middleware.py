from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger
from datetime import datetime

logger.add("finxplain_engine.log", rotation="1 MB", retention="7 days", compression="zip")

class LoggingAndPerformanceMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = datetime.now()

        logger.info(f"FinXplain Entry | {request.method} {request.url.path}")

        response = await call_next(request)

        end_time = datetime.now()
        latency = (end_time - start_time).total_seconds()

        logger.info(f"FinXplain Exit  | Status: {response.status_code} | Latency: {latency:.4f}s")

        return response