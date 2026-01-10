import base64, json
import numpy as np
import cv2
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import os
import sys
import subprocess

PROCESS = None

app = FastAPI()

@app.post("/start_cnn")
def start_cnn():
    global PROCESS
    if PROCESS is None or PROCESS.poll() is not None:
        # fatigue_demo_cnn.py 경로를 프로젝트에 맞게 조정하세요
        script_path = os.path.join(os.getcwd(), "fatigue_demo_cnn.py")
        PROCESS = subprocess.Popen([sys.executable, script_path])
        return {"ok": True, "started": True}
    return {"ok": True, "started": False, "msg": "already running"}

@app.post("/stop_cnn")
def stop_cnn():
    global PROCESS
    if PROCESS and PROCESS.poll() is None:
        PROCESS.terminate()
        return {"ok": True, "stopped": True}
    return {"ok": True, "stopped": False}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def decode_dataurl_to_bgr(data_url: str):
    _, b64 = data_url.split(",", 1)
    img_bytes = base64.b64decode(b64)
    arr = np.frombuffer(img_bytes, dtype=np.uint8)
    return cv2.imdecode(arr, cv2.IMREAD_COLOR)

@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    while True:
        msg = await ws.receive_text()
        data = json.loads(msg)

        frame = decode_dataurl_to_bgr(data["image"])  # 지금은 안 써도 됨

        out = {"state": "CONNECTED"}
        await ws.send_text(json.dumps(out))


