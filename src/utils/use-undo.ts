import React, { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const undo = useCallback(() => { //回退
    if (!canUndo) {
      return;
    }

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  }, [canUndo, future, past, present]);

  const redo = useCallback(() => {
    if (!canRedo) {
      return;
    }
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, future, past, present]);


  const set = useCallback((newPresent: T) => {
    if (newPresent === present) {
      return;
    }
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]); // 插入的话,就不存在redo的概念了
  }, [past, present]);

  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  }, []);

  return {
    past,
    present,
    future,
    set,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}