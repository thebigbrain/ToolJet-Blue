import React, { useEffect, forwardRef, CSSProperties } from "react";
import "@/_styles/widgets/kanban.scss";
import cx from "classnames";
import { Handle } from "./Handle";
import { SubContainer } from "@/modules/Editor/SubContainer";

export const Item = React.memo<any>(
  forwardRef<HTMLLIElement, any>(
    (
      {
        dragOverlay,
        dragging,
        disabled,
        handleProps,
        index,
        listeners,
        sorting,
        transition,
        transform,
        value,
        cardWidth,
        cardHeight,
        kanbanProps,
        parentRef = null,
        isDragActive = false,
        isFirstItem = false,
        setShowModal = () => {},
        cardDataAsObj = {},
        ...props
      },
      ref
    ) => {
      const {
        id,
        component,
        containerProps,
        fireEvent,
        setExposedVariable,
        darkMode,
      } = kanbanProps;
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }
        document.body.style.cursor = "grabbing";
        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          className={cx(
            "kanban-item",
            sorting && "sorting",
            dragOverlay && "dragOverlay"
          )}
          style={
            {
              transition: [transition].filter(Boolean).join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              width: `${Number(cardWidth) || 300}px`,
              height: `${Number(cardHeight) || 100}px`,
            } as CSSProperties
          }
          ref={ref}
          onClick={({ target }: any) => {
            if (
              target.style.cursor.includes("resize") ||
              target?.classList?.contains("delete-icon") ||
              target?.parent?.classList?.contains("resizer-active")
            )
              return;
            setExposedVariable("lastSelectedCard", cardDataAsObj[value]).then(
              () => {
                setShowModal(true);
                fireEvent("onCardSelected");
              }
            );
          }}
        >
          <div
            className={cx(
              "item",
              "withHandle",
              dragging && "dragging",
              dragOverlay && "dragOverlay",
              disabled && "disabled",
              darkMode && "dark-light"
            )}
            {...props}
          >
            <div
              className="subcontainer-container"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <SubContainer
                parentComponent={component}
                containerCanvasWidth={Number(cardWidth) || 300}
                parent={`${id}`}
                parentName={component.name}
                customResolvables={{ cardData: cardDataAsObj[value] }}
                {...containerProps}
                readOnly={isDragActive || !isFirstItem}
                parentRef={parentRef}
              />
            </div>
            <span className="handle-container">
              <Handle {...handleProps} {...listeners} />
            </span>
          </div>
        </li>
      );
    }
  )
);
