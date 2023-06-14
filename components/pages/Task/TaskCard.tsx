import { ITask } from "@/utils/zustand/taskStore/ITaskStore";
import dayjs from "dayjs";
import Image from "next/image";
import React, { forwardRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import * as Popover from "@radix-ui/react-popover";
import { RxMixerHorizontal } from "react-icons/rx";
import { GiCrossMark } from "react-icons/gi";
import {
  BsClockHistory,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";

interface ComponetProps {
  task: ITask;
  index: number;
}

const TaskCard = forwardRef<HTMLDivElement, ComponetProps>(
  ({ task, index }, ref) => {
    const clippedText =
      task.description.length >= 70
        ? task.description.slice(0, 70) + "..."
        : task.description;

    console.log(task);

    return (
      <div ref={ref}>
        <Draggable draggableId={task.$id} index={index}>
          {(draggableProvided, draggableSnapshot) => (
            <div
              className="w-full shadow-shadow-primary-xsm bg-bg-primary flex-wrap  pb-0 pt-8 relative rounded-lg flex flex-col"
              {...draggableProvided.dragHandleProps}
              {...draggableProvided.draggableProps}
              ref={draggableProvided.innerRef}
            >
              <div className="px-3">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className="absolute right-2 top-2"
                      aria-label="Update dimensions"
                    >
                      <BsThreeDotsVertical className="w-4 h-4" />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="rounded p-2 w-[160px] bg-bg-primary-light first-of-type-[]"
                      sideOffset={5}
                    >
                      <span className="w-full cursor-pointer block px-1.5 transition-all rounded-md text-text-primary hover:bg-bg-primary">
                        View Details
                      </span>
                      <span className="w-full cursor-pointer block px-1.5 transition-all rounded-md text-text-primary hover:bg-bg-primary">
                        Delete
                      </span>
                      <Popover.Arrow className="fill-white" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
                <span
                  className={`absolute left-0 text-[10px] top-0 px-3 rounded-tl-lg border py-0.5 border-dashed rounded-br-lg ${
                    task.priority === "urgent" && "border-[#FE2F48]"
                  } ${task.priority === "high" && "border-[#fa5252]"} ${
                    task.priority === "medium" && "border-[#fcc419]"
                  } ${task.priority === "low" && "border-[#868e96]"}`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{task.title}</span>
                  <span className="text-text-secondary text-sm">
                    {clippedText}
                  </span>

                  {task.images.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                      {task.images.length > 0 &&
                        task.images.map((url) => (
                          <Image
                            key={url}
                            src={url}
                            width={58}
                            height={58}
                            alt="Task Image"
                            className="w-[4.5rem] rounded-lg h-[4.5rem] object-cover"
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="py-2 px-3 mt-4 border-t text-text-secondary border-border-primary flex justify-between items-center">
                <span className="text-xs">
                  {dayjs(task.$createdAt).format("D MMMM YYYY")}
                </span>
                {task.dueDate && (
                  <span className="text-xs flex items-center gap-1.5">
                    <BsClockHistory />{" "}
                    {dayjs(task.dueDate).format("D MMMM YYYY")}
                  </span>
                )}
              </div>
            </div>
          )}
        </Draggable>
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
