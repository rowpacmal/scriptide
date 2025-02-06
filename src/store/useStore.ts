import useEditorStore from './useEditorStore';

function useStore() {
  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  return { code, setCode };
}

export default useStore;
