import { User } from "src/users/entities/user.model";
import { Event } from "src/events/entities/event.model";
import { Registration } from "src/registrations/entities/registration.model";
import { Post } from "src/posts/entities/post.model";
import { ContactMessage } from "src/contact-messages/entities/contact-message.model";

export const models = [User, Event, Registration, Post, ContactMessage];

export { User, Event, Registration, Post , ContactMessage};
