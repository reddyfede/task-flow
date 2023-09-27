from datetime import *

calendar = {
    "mon": [[8, 12], [13, 17]],
    "tue": [[8, 12], [13, 17]],
    "wed": [[8, 12], [13, 17]],
    "thu": [[8, 12], [13, 17]],
    "fri": [[8, 12], [13, 17]],
    "sat": [[8, 12], [13, 17]],
    "sun": [[8, 12], [13, 17]],
}

conversion = {
    0: "mon",
    1: "tue",
    2: "wed",
    3: "thu",
    4: "fri",
    5: "sat",
    6: "sun",
}


duration = 60 * 4


start_datetime = datetime.now()
end_datetime = start_datetime + timedelta(minutes=duration)

print("\nstart:", start_datetime)
print("duration h:", duration / 60)
print("duration m:", duration)
print("end:", end_datetime)


end_hour = end_datetime.hour
start_hour = start_datetime.hour
end_day = end_datetime.weekday()
start_day = start_datetime.weekday()
start_day_str = conversion[start_day]
end_day_str = conversion[end_day]


end_workday_time = datetime.strptime(
    str(time(calendar[start_day_str][1][1], 0)), "%H:%M:%S"
)

start_time = datetime.strptime(
    str(time(start_datetime.hour, start_datetime.minute)), "%H:%M:%S"
)
remaining_time = (end_workday_time - start_time).total_seconds() / 60
print("\nminutes to end of day:", remaining_time)


if (
    remaining_time
    - 60 * (calendar[start_day_str][1][1] - calendar[start_day_str][0][1])
    > duration
):
    print("\nenough time to end task in the morning")
    actual_end_time = end_datetime
    print("actual end time:", actual_end_time)
elif (
    start_hour >= calendar[start_day_str][0][0]
    and start_hour < calendar[start_day_str][0][1]
) and (remaining_time > duration + 60):
    print("\ntasnk start in the morning and enough time to end task in the afternoon")
    actual_end_time = end_datetime + timedelta(minutes=60)
    print("actual end time:", actual_end_time)
elif (
    start_hour >= calendar[start_day_str][1][0]
    and start_hour < calendar[start_day_str][1][1]
) and (remaining_time > duration):
    print("\ntask start in the afternoon and enough time to end task in the afternoon")
    actual_end_time = end_datetime
    print("actual end time:", actual_end_time)
else:
    print("\nNOT enough time to end task today")
    allocated_today = remaining_time
    if (
        start_hour >= calendar[start_day_str][0][0]
        and start_hour < calendar[start_day_str][0][1]
    ):
        allocated_today -= 60
    allocated_tomorrow = duration - allocated_today
    print("allocated today: ", allocated_today)
    print("allocated tomorrow: ", allocated_tomorrow)
    if start_day == 6:
        tomorrow = 0
    else:
        tomorrow = start_day + 1
    tomorrow_date = start_datetime.date() + timedelta(days=1)
    tomorrow_end_time = (
        datetime.strptime(
            str(time(calendar[conversion[tomorrow]][0][0], 0)), "%H:%M:%S"
        )
        + timedelta(minutes=allocated_tomorrow)
    ).time()
    actual_end_time = datetime.combine(tomorrow_date, tomorrow_end_time)
    print(tomorrow_date)
    print("actual end time: ", actual_end_time)
