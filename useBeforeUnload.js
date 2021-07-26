import { useEffect } from 'react';

/** useBeforeUnload
 * @param {*} value: ((e: BeforeUnloadEvent) => any) | string
 */
const useBeforeUnload = (shouldBlockNavigation = true, value = "You'll lose your data!") => {
  const handleBeforeunload = e => {
    let returnValue;
    if (typeof value === 'function') {
      returnValue = value(e);
    } else {
      returnValue = value;
    }
    if (returnValue) {
      e.preventDefault();
      e.returnValue = returnValue;
    }
    return returnValue;
  };

  useEffect(() => {
    if (shouldBlockNavigation) {
      window.addEventListener('beforeunload', handleBeforeunload);
    }
    return () => {
      console.log('unmounting shouldBlockNavigation', shouldBlockNavigation);
      if (shouldBlockNavigation) {
        // TODO: Save unsaved data in sesionStorage
        // https://reach.tech/router/credits
        window.removeEventListener('beforeunload', handleBeforeunload);
      }
    };
  }, [shouldBlockNavigation]);
};

export default useBeforeUnload;
