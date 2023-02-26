import {useEffect} from "react";

export function useOutsideAlerter(ref: any, callback: (isInBounds: boolean) => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current === null) {
        return;
      }

      const mouseX = event.clientX
      const mouseY = event.clientY

      const elemBounds = ref.current.getBoundingClientRect()

      const elemTop = elemBounds.y;
      const elemLeft = elemBounds.x;
      const elemRight = elemLeft + elemBounds.width;
      const elemBottom = elemTop + elemBounds.height;

      const inElemBounds = mouseX >= elemLeft && mouseX <= elemRight &&
        mouseY >= elemTop && mouseY <= elemBottom

      callback(inElemBounds)
    }

    // Bind the event listener
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
