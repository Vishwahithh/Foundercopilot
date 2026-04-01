#!/usr/bin/env python3
"""
Founder research scraper using Chrome DevTools Protocol
"""

import json
import subprocess
import time
from datetime import datetime

# Founder X handles to monitor
FOUNDERS = {
    "marclou": {"name": "Marc Lou", "stage": "bootstrapped portfolio", "revenue": "unknown"},
    "GuillaumeMoubeche": {"name": "Guillaume Moubeche", "stage": "bootstrapped $20M ARR", "revenue": "20M"},
    "AdamRobinson_": {"name": "Adam Robinson", "stage": "bootstrapped $14M ARR", "revenue": "14M"},
    "SimonHoiberg_": {"name": "Simon Høiberg", "stage": "bootstrapped portfolio", "revenue": "unknown"},
    "JonathanRintala": {"name": "Jonathan Rintala", "stage": "VC-backed $5M+ ARR", "revenue": "5M+"},
}

CDP_PORT = 18800
CDP_URL = f"http://127.0.0.1:{CDP_PORT}"

def get_active_tab():
    """Get current active tab"""
    result = subprocess.run(
        ["curl", "-s", f"{CDP_URL}/json"],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        return None
    try:
        tabs = json.loads(result.stdout)
        return tabs[0] if tabs else None
    except:
        return None

def main():
    print("[*] Founder Research Scraper Initialized")
    print(f"[*] CDP Port: {CDP_PORT}")
    print(f"[*] Monitoring {len(FOUNDERS)} founders")
    print(f"[*] Timestamp: {datetime.now().isoformat()}")
    print()
    
    # Check browser connectivity
    tab = get_active_tab()
    if tab:
        print("[✓] Browser connected via CDP")
        print(f"    Current URL: {tab.get('url')}")
    else:
        print("[!] Browser not reachable via CDP")
    
    print()
    print("=== FOUNDER LIST ===")
    for handle, info in FOUNDERS.items():
        print(f"\n{info['name']} (@{handle})")
        print(f"  Stage: {info['stage']}")
        print(f"  Revenue: {info['revenue']}")
        print(f"  Profile: https://x.com/{handle}")

if __name__ == "__main__":
    main()
