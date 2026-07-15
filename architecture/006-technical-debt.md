# Technical Debt

## Backend

### NestJS Watch Mode on Windows

#### TO DO Status: Pending investigation

Environment:

- Windows 11
- Node 22.23.1
- Nest CLI 11.0.24

Problem:

The NestJS watcher crashes after detecting file changes.

Error:

taskkill /pid xxxx /T /F

ERROR: Not found

Impact:

Developer experience only.

Production is NOT affected.

Priority:

Low.