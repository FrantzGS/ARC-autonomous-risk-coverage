import logging
from logging.handlers import RotatingFileHandler
import os

def get_logger(name: str = "ARC"):
    log_dir = "logs"
    os.makedirs(log_dir, exist_ok=True)

    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    if not logger.handlers:
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        console_format = logging.Formatter("🔎 [%(levelname)s] %(message)s")
        console_handler.setFormatter(console_format)

        # File handler (rotating)
        file_handler = RotatingFileHandler(f"{log_dir}/arc.log", maxBytes=1000000, backupCount=3)
        file_handler.setLevel(logging.DEBUG)
        file_format = logging.Formatter("[%(asctime)s] [%(levelname)s] %(name)s - %(message)s")
        file_handler.setFormatter(file_format)

        logger.addHandler(console_handler)
        logger.addHandler(file_handler)

    return logger
