import { useEffect, useRef, useState } from "react";

export function VideoCallTab() {
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const [running, setRunning] = useState(false);
  const [serverFrame, setServerFrame] = useState<string | null>(null);
  const [serverState, setServerState] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const avatars = [
    { id: 1, name: "강아지", image: "https://images.unsplash.com/photo-1636661550686-e2fbd350f78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400" },
    { id: 2, name: "고양이", image: "https://images.unsplash.com/photo-1643899348858-43ac198cdf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400" },
    { id: 3, name: "판다", image: "https://images.unsplash.com/photo-1599951420058-5ec049a03e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400" },
  ];

  const stopAll = () => {
    setRunning(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;

    if (wsRef.current) wsRef.current.close();
    wsRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    streamRef.current = null;
  };

  const startMeeting = async () => {
    setIsMeetingStarted(true);

    await fetch("http://127.0.0.1:8000/start_cnn", { method: "POST" });

    setTimeout(() => setIsMeetingStarted(false), 3000);
    // 1) 카메라 켜기
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    // 2) 웹소켓 연결
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.frame) setServerFrame(msg.frame);
        if (msg.state) setServerState(String(msg.state));
      } catch {}
    };

    ws.onopen = () => {
      setRunning(true);
      // 3) 주기적으로 프레임 보내기
      timerRef.current = window.setInterval(() => {
        if (!videoRef.current || !canvasRef.current || !wsRef.current) return;
        if (wsRef.current.readyState !== WebSocket.OPEN) return;

        const v = videoRef.current;
        const c = canvasRef.current;
        c.width = 640;
        c.height = 360;

        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(v, 0, 0, c.width, c.height);
        const dataUrl = c.toDataURL("image/jpeg", 0.8);

        wsRef.current.send(JSON.stringify({ frame: dataUrl }));
      }, 200);
    };

    ws.onclose = () => stopAll();
    ws.onerror = () => stopAll();

    // 로딩 화면 1초만 보여주고 닫기(원하시는 연출 유지)
    setTimeout(() => setIsMeetingStarted(false), 1000);
  };

  useEffect(() => {
    return () => stopAll();
  }, []);

  if (isMeetingStarted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <p className="text-white text-2xl">새 회의를 시작합니다</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4 text-gray-900">영상통화를 시작하겠습니까?</h1>
        <p className="text-lg text-gray-600">집중해YOU는 모든 대학생들의 랩탑 공부의 효율성을 추구합니다.</p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={startMeeting}
          className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 회의
        </button>

        {running && (
          <button
            onClick={stopAll}
            className="ml-3 px-6 py-4 bg-gray-200 text-gray-900 rounded-full text-lg hover:bg-gray-300 transition-colors shadow"
          >
            종료
          </button>
        )}
      </div>

      {/* ✅ 웹캠/서버 화면 영역 */}
      <div className="w-full flex flex-col items-center gap-3 mb-12">
        <video ref={videoRef} className="hidden" playsInline />
        <canvas ref={canvasRef} className="hidden" />

        {serverFrame ? (
          <img src={serverFrame} className="w-full max-w-3xl rounded-xl shadow" />
        ) : (
          <div className="w-full max-w-3xl h-[360px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            새 회의를 누르면 웹캠이 연결됩니다.
          </div>
        )}

        {running && (
          <div className="text-sm text-gray-600">
            Server state: <span className="font-semibold">{serverState}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 mb-12"></div>

      <div className="text-center">
        <h2 className="text-2xl mb-8 text-gray-800">나만의 아바타 고르기</h2>
        <div className="flex justify-center gap-8">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`w-32 h-32 rounded-full overflow-hidden border-4 transition-all ${
                selectedAvatar === avatar.id ? "border-blue-600 scale-110 shadow-xl" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img src={avatar.image} alt={`아바타 ${avatar.name}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
