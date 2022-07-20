import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Arg,
  Mutation,
} from "type-graphql";
import fs from "fs";
import { getCalendar, oauth2Client } from "../utils/google-signin";
import { google } from "googleapis";
import dayjs from "dayjs";
import { CalendarEvent } from "../entities/CalendarEvent";
import { getDataSource } from "../../lib/TypeORM";

@ObjectType()
export class GoogleCalendar {
  @Field()
  name!: string;

  @Field()
  id!: string;
}

@ObjectType()
export class GoogleEvent {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}

@ObjectType()
export class BothEvents {
  @Field(() => CalendarEvent, { nullable: true })
  savedEvent!: CalendarEvent | null;

  @Field(() => GoogleEvent)
  googleEvent!: GoogleEvent;
}

@Resolver()
export class EventResolver {
  @Query(() => [GoogleCalendar])
  async getGoogleCalendars() {
    const calendars = (await getCalendar().calendarList.list()).data.items;
    return calendars?.map((cal, index) => {
      return {
        name: cal.summary,
        id: cal.id,
      };
    });
  }

  @Query(() => [BothEvents])
  async getGoogleEvents(
    @Arg("calendarId") calendarId: string
  ): Promise<BothEvents[]> {
    const events = (await getCalendar().events.list({ calendarId })).data.items;
    const dataSource = await getDataSource();
    const savedEvents = await dataSource.getRepository(CalendarEvent).find();
    console.log(await dataSource.getRepository(CalendarEvent).find());
    if (events) {
      const eventsWithoutUndefined = events.filter((event) => {
        if (event.id && event.start && event.end && event.summary) {
          return true;
        } else {
          return false;
        }
      });
      const formattedEvents = eventsWithoutUndefined.map((item, index) => {
        const existingEvent = savedEvents.find(
          (savedEvent) => savedEvent.googleId == item.id
        );
        console.log(existingEvent);
        const isSaved = Boolean(existingEvent);
        const startDate = item.start?.date
          ? dayjs(item.start.date).toDate()
          : dayjs(item.start?.dateTime).toDate();
        const endDate = item.end?.date
          ? dayjs(item.end.date).toDate()
          : dayjs(item.end?.dateTime).toDate();
        return {
          googleEvent: {
            name: item.summary as string,
            id: item.id as string,
            startDate,
            endDate,
          },
          savedEvent: existingEvent
            ? {
                id: existingEvent.id,
                name: existingEvent.name,
                startDate: existingEvent.startDate,
                endDate: existingEvent.endDate,
                googleId: existingEvent.googleId,
              }
            : null,
        };
      });
      return formattedEvents;
    }
    return [];
  }

  @Mutation(() => CalendarEvent)
  async saveEvent(
    @Arg("name") name: string,
    @Arg("startDate") startDate: Date,
    @Arg("endDate") endDate: Date,
    @Arg("googleId") googleId: string
  ) {
    const dataSource = await getDataSource();
    const event = dataSource
      .getRepository(CalendarEvent)
      .create({ name, startDate, endDate, googleId });
    const result = await dataSource.getRepository(CalendarEvent).save(event);
    return result;
  }
}
