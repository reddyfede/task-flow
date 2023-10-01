# TaskFlow

TaskFlow is an app to manage your team work.
The Team Leader can create tasks and assign them to team members on a week-calendar.

[Live app](https://task-flow-prod.netlify.app/)

## Features

Team Members can view tasks assigned to them on a day-calendar and interact with tasks logging:

- task start time
- task pause start/end time
- encountered issue start and end time
- task end time

The calendar will automatically shifts all the tasks assigned to a Team Member if one task is taking more (or less) time to complete compared to the estimate of the Team Leader.

### Front-end

- Displays an interactive map for viewing local events.

### Back-end

- Used Node and Express to manage user and event data.

# Screenshots

## Employee View

### Home Page

## Manager View

### Home Page

### Gantt View Page

## Technologies Used

### React / Django Full Stack Application

- HTML
- CSS
- JS
- Styled Components
- React
- Django
- Postgres
- PSQL
- Heroku
- Netlify

## Icebox Features

- [ ] Refactor Gantt Chart to have by-the-minute updates
- [ ] Access a report when a user pauses a task due to an issue
- [ ] Add a Dashboard to display information about task completion, percentage completed on time, percentage completed early, etc.
- [ ] Add a more dynamic data table for tasks with sorting and filtering
- [ ] Notify manager when a task is past due, or warn when approaching due date
- [ ] Color tasks on the Gantt chart
- [ ] Drag and drop tasks onto the Gantt
- [ ] Real time updates for Gantt chart, when employees change task status
- [ ] Flashing Icons for tasks paused that are approaching due date
- [ ] Notify manager on task status change due to employee pause
- [ ] Display a day-view version of the Gantt chart in employee view
- [ ] Condense Gantt view to earlier employee start time, and latest employee end time to display only active team working hours
- [ ] Allow managers to view the task log for research
- [ ] Allow managers to click a task on the Gantt chart for more information and controls
