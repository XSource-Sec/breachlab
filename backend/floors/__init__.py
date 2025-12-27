"""
BreachLab Floor Handlers
"""

from .base import FloorHandler
from .floor_01_emma import EmmaHandler
from .floor_02_marcus import MarcusHandler
from .floor_03_oscar import OscarHandler
from .floor_04_nova import NovaHandler
from .floor_05_alex import AlexHandler
from .floor_06_diana import DianaHandler
from .floor_07_aria import AriaHandler
from .floor_08_victoria import VictoriaHandler
from .floor_09_chairman import ChairmanHandler
from .floor_10_sentinel import SentinelHandler

FLOOR_COUNT = 10

FLOOR_HANDLERS = {
    1: EmmaHandler,
    2: MarcusHandler,
    3: OscarHandler,
    4: NovaHandler,
    5: AlexHandler,
    6: DianaHandler,
    7: AriaHandler,
    8: VictoriaHandler,
    9: ChairmanHandler,
    10: SentinelHandler,
}


def get_floor_handler(floor_id: int) -> FloorHandler:
    """Get the handler for a specific floor."""
    if floor_id not in FLOOR_HANDLERS:
        raise ValueError(f"Invalid floor ID: {floor_id}")
    return FLOOR_HANDLERS[floor_id]()
