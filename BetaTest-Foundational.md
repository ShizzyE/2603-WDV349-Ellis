# PlanBuddy End-to-End Testing

## Goal

Test the complete PlanBuddy workflow from authentication through task management and AI functionality.

---

## 1. User Registration

1. Open PlanBuddy.

2. Create a new user account.

**Result =**

- Account created and saved to DB
- Password hashed and stored safely
- Redirected to Dashboard

---

## 2. User Login / Logout

1. Log in with the newly created account.

2. Navigate through the app.

3. Log out.

**Result =**

- User successfully logged in
- Authentication persisted while navigating
- User information displayed correctly
- User successfully logged out
- Authentication state cleared after logout

---

## 3. Task Management

### Create Task

1. Create a new task.

**Result =**

- Task created successfully
- Full task data securely stored in DB
- Task displayed correctly in the application

### Edit Task

1. Edit an existing task.

**Result =**

- Task updated successfully
- Updated task data saved to DB
- Changes displayed correctly in the application

### Delete Task

1. Delete an existing task.

**Result =**

- Task deleted successfully
- Task removed from the application
- Task removed from DB

---

## 4. Task Filtering / Sorting

1. Create multiple tasks with different priorities, statuses, labels, and due dates.

2. Test task filtering.

3. Test task sorting.

**Result =**

- Tasks filtered correctly
- Tasks sorted correctly by available options
- Task information remained accurate

---

## 5. AI Task Management

### Create Task

1. Ask PlanBuddy to create a task.

**Result =**

- AI successfully created the requested task
- Task data saved to DB
- Created task displayed correctly in the application

### Retrieve Tasks

1. Ask PlanBuddy to retrieve tasks.

**Result =**

- AI successfully retrieved the user's tasks
- Returned task information matched the DB

### Update Task

1. Ask PlanBuddy to update an existing task.

**Result =**

- AI successfully updated the requested task
- Updated task data saved to DB
- Changes displayed correctly in the application

---

## 6. Settings

1. Log in to PlanBuddy.

2. Navigate to Settings.

3. Test the available Settings functionality.

4. Verify that Settings are secured.

**Result =**

- Settings functionality worked correctly
- Settings were accessible to authenticated users
- Unauthorized access was prevented
- Settings changes were applied successfully