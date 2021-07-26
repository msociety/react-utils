import { useState, useEffect, useRef } from 'react';

// Based on https://github.com/infodusha/react-hook-size

const useElementSize = ref => {
  const obs = useRef();
  const [, setIgnored] = useState(0);
  const [size, setSize] = useState({ width: null, height: null });

  useEffect(() => {
    function observe(entries) {
      const { width, height } = entries[0].contentRect;
      setSize(s => (s.width !== width || s.height !== height ? { width, height } : s));
    }
    obs.current = new window.ResizeObserver(observe);
    return () => obs.current.disconnect();
  }, []);

  useEffect(() => {
    const forceUpdate = () => setIgnored(c => c + 1);
    const item = ref.current;
    if (item) {
      obs.current.observe(item);
      window.setTimeout(forceUpdate, 0);
    }
    return () => item && obs.current.unobserve(item);
  }, [obs, ref]);

  return size;
};

export default useElementSize;
