import { createContext, useCallback, useRef, useState } from 'react';
import { router } from 'expo-router';
import { ActivityWithCardsType } from '@/types/ActivityTypes';
import { LEARNER, TRAINER } from '@/core/data/constants';

export const Context = createContext({});

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [activity, setActivity] = useState<ActivityWithCardsType | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timer = useRef<number>(0);
  const [finalTimer, setFinalTimer] = useState<number>(0);
  const [profileId, setProfileId] = useState('');
  const [mode, setMode] = useState('');

  const startTimer = () => {
    interval.current = setInterval(() => { timer.current += 1; }, 1000);
  };

  const stopTimer = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    setFinalTimer(timer.current);
  }, []);

  const navigateNext = useCallback(() => {
    if (mode === LEARNER) {
      router.navigate({
        pathname: '/Courses/LearnerCourseProfile',
        params: { courseId: profileId, endedActivity: activity?._id },
      });
    } else if (mode === TRAINER) {
      router.navigate({ pathname: '/Courses/TrainerCourseProfile', params: { courseId: profileId } });
    } else {
      router.navigate({ pathname: '/Courses/SubProgramProfile', params: { subProgramId: profileId } });
    }
  }, [activity?._id, mode, profileId]);

  return (
    <Context.Provider value={{
      activity,
      setActivity,
      startTimer,
      stopTimer,
      navigateNext,
      setProfileId,
      mode,
      setMode,
      finalTimer,
      interval,
      isActive,
      setIsActive,
    }}>
      {children}
    </Context.Provider>
  );
};
