"use client"

import * as React from "react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {DayPicker} from "react-day-picker"
import {vi} from "react-day-picker/locale"
import {Button} from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            locale={vi}
            timeZone={"Asia/Ho_Chi_Minh"}
            showOutsideDays={showOutsideDays}
            defaultMonth={new Date(2000, 0)}
            classNames={{
                ...classNames,
            }}
            components={{

                PreviousMonthButton: props1 => (
                    <Button
                        {...props1}

                        variant={"noShadow"}
                        size={"icon"}
                    >
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>
                ),
                NextMonthButton: props2 => (
                    <Button
                        {...props2}
                        variant={"noShadow"}
                        size={"icon"}
                    >
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                ),
            }}
            {...props}
        />
    )
}

Calendar.displayName = "Calendar"

export {Calendar}