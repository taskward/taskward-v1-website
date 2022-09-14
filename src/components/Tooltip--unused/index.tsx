/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Complete
import { Children, cloneElement, ReactNode } from "react";

type TooltipProps = {
  title?: ReactNode | (() => ReactNode);
  children?: ReactNode;
  color?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  placement?: "top" | "bottom" | "left" | "right";
  zIndex?: number;
};

export default function Tooltip({ children }: TooltipProps): JSX.Element {
  function getOffset(dom: any) {
    let parent: any = dom;
    let left = 0;
    let top = 0;
    while (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {
      left,
      top,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
    };
  }

  return (
    <>
      {Children.map(children, (child: any) => {
        return cloneElement(child, {
          className: "tooltipWrapper",
          //   onMouseEnter: mouseIn,
          //   onMouseLeave: mouseLeave,
        });
      })}
    </>
  );
}
