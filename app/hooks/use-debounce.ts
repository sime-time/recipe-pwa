export function useDebounce(value: any, delay: number) {
  const debouncedValue = ref(value);

  watchEffect((onCleanup) => {
    const timeoutHandler = setTimeout(() => {
      debouncedValue.value = value;
    }, delay);

    // cleanup function runs when the effect re-runs or component unmounts
    onCleanup(() => {
      clearTimeout(timeoutHandler);
    });
  });

  return debouncedValue;
}
