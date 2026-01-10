import { useState } from 'react';

interface PlanItem {
  id: number;
  duration: number;
  startTime: string;
  endTime: string;
  activity: string;
}

export function PlannerTab() {
  const [showPlanner, setShowPlanner] = useState(false);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  const [currentStartTime, setCurrentStartTime] = useState<string>('');

  const durations = [1, 5, 10, 15, 20, 30, 40, 60, 90, 120, 180, 240];
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? '오전' : '오후';
    return `${period} ${hour}시`;
  });

  const addPlan = () => {
    const newPlan: PlanItem = {
      id: Date.now(),
      duration: 0,
      startTime: '',
      endTime: '',
      activity: '',
    };
    setPlans([...plans, newPlan]);
    setEditingId(newPlan.id);
    setShowDurationPicker(true);
  };

  const handleDurationSelect = (duration: number, planId: number) => {
    setCurrentDuration(duration);
    setShowDurationPicker(false);
    setShowTimePicker(true);
  };

  const handleTimeSelect = (time: string, planId: number) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    // Calculate end time
    const [period, hourStr] = time.split(' ');
    let hour = parseInt(hourStr);
    if (period === '오후' && hour !== 12) hour += 12;
    if (period === '오전' && hour === 12) hour = 0;

    const endMinutes = hour * 60 + currentDuration;
    const endHour = Math.floor(endMinutes / 60) % 24;
    const endPeriod = endHour < 12 ? '오전' : '오후';
    const displayEndHour = endHour % 12 || 12;
    const endMin = endMinutes % 60;
    const endTime = `${endPeriod} ${displayEndHour}시${endMin > 0 ? ` ${endMin}분` : ''}`;

    setPlans(
      plans.map((p) =>
        p.id === planId
          ? { ...p, duration: currentDuration, startTime: time, endTime }
          : p
      )
    );
    setShowTimePicker(false);
    setCurrentStartTime('');
  };

  const updateActivity = (id: number, activity: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, activity } : p)));
  };

  if (!showPlanner) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <div className="border-t-2 border-gray-300 mb-8"></div>
          <button
            onClick={() => setShowPlanner(true)}
            className="w-full py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            계획 생성하기
          </button>
          <div className="border-b-2 border-gray-300 mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="border-t-2 border-gray-300 mb-8"></div>

        {/* Plan Items */}
        <div className="space-y-4 mb-6">
          {plans.map((plan) => (
            <div key={plan.id} className="flex items-center gap-4">
              {/* Add Button */}
              <button
                onClick={addPlan}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors text-xl flex-shrink-0"
              >
                +
              </button>

              {/* Time Display */}
              <div className="w-64 flex-shrink-0">
                {plan.startTime && plan.endTime ? (
                  <div
                    className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-colors"
                    onClick={() => {
                      setEditingId(plan.id);
                      setShowDurationPicker(true);
                    }}
                  >
                    <span className="text-gray-800">
                      {plan.startTime} ~ {plan.endTime}
                    </span>
                  </div>
                ) : (
                  <div
                    className="px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-colors"
                    onClick={() => {
                      setEditingId(plan.id);
                      setShowDurationPicker(true);
                    }}
                  >
                    <span className="text-gray-400">시간 선택</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-300"></div>

              {/* Activity Input */}
              <input
                type="text"
                value={plan.activity}
                onChange={(e) => updateActivity(plan.id, e.target.value)}
                placeholder="활동 입력 (예: 공부하기)"
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Initial Add Button */}
        {plans.length === 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={addPlan}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors text-xl"
            >
              +
            </button>
            <div className="flex-1 px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
              <span className="text-gray-400">시간 선택</span>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div className="flex-1 px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
              <span className="text-gray-400">활동 입력</span>
            </div>
          </div>
        )}

        <div className="border-b-2 border-gray-300 mt-8"></div>

        {/* Inspirational Message */}
        <p className="text-center text-gray-600 mt-8 text-lg">
          계획을 작성해보세요. 놀라운 하루를 만들어 보세요.
        </p>
      </div>

      {/* Duration Picker Modal */}
      {showDurationPicker && editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl mb-6 text-center text-gray-900">
              시간 단위 선택
            </h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationSelect(duration, editingId)}
                  className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  {duration}분
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowDurationPicker(false);
                setEditingId(null);
              }}
              className="w-full py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {showTimePicker && editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl mb-6 text-center text-gray-900">
              시작 시간 선택
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time, editingId)}
                  className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowTimePicker(false);
                setEditingId(null);
              }}
              className="w-full py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
