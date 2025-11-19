// types.ts (optional)
export type Task = {
  id: string;
  name: string;
  createdAt: Date;
};

// taskCreator.ts
export class TaskCreator {
  createTask(name: string): Task {
    // business logic for creating a task belongs here
    const task: Task = {
      id: Math.random().toString(36).slice(2),
      name,
      createdAt: new Date(),
    };

    console.log(`Creating task: ${task.name} (id=${task.id})`);
    // persist to DB / repo would be done here or delegated to a repository
    return task;
  }
}

// emailService.ts
export class EmailService {
  sendEmail(to: string, subject?: string, body?: string): void {
    // sending email logic lives here (SMTP, third-party API, etc.)
    console.log(`Sending email to ${to}`);
    // Real implementation would call an email provider
  }
}

// taskOrchestrator.ts (the coordinator)
import { TaskCreator } from './taskCreator';
import { EmailService } from './emailService';

export class TaskOrchestrator {
  constructor(
    private taskCreator: TaskCreator,
    private emailService: EmailService
  ) {}

  createTaskAndNotify(name: string, notifyEmail?: string) {
    // The orchestrator's single responsibility is to coordinate the workflow
    const task = this.taskCreator.createTask(name);

    if (notifyEmail) {
      const subject = `Task created: ${task.name}`;
      const body = `Your task "${task.name}" was created with id ${task.id}.`;
      this.emailService.sendEmail(notifyEmail, subject, body);
    }

    return task;
  }
}

// usage example (index.ts)
const taskCreator = new TaskCreator();
const emailService = new EmailService();
const orchestrator = new TaskOrchestrator(taskCreator, emailService);

orchestrator.createTaskAndNotify('Write unit tests', 'team@example.com');
