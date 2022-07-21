import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import fs from "fs";
import { getCalendar, oauth2Client } from "../utils/google-signin";
import { calendar_v3, google } from "googleapis";
import dayjs from "dayjs";
import { CalendarEvent } from "../entities/CalendarEvent";
import { getDataSource } from "../../lib/TypeORM";
import { Tag } from "../entities/Tag";
import { isAuth } from "../middleware/isAuth";
import { getSession } from "next-auth/react";
import { MyContext } from "../types/MyContext";
import { User } from "../entities/User";

const formatGoogleEvent = (event: calendar_v3.Schema$Event) => {
  const startDate = event.start?.date
    ? dayjs(event.start.date).toDate()
    : dayjs(event.start?.dateTime).toDate();
  const endDate = event.end?.date
    ? dayjs(event.end.date).toDate()
    : dayjs(event.end?.dateTime).toDate();
  const formattedEvent = {
    id: event.id as string,
    name: event.summary as string,
    startDate: startDate,
    endDate: endDate,
    allDay: event.start?.dateTime ? false : true,
  };
  return formattedEvent;
};

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

  @Field()
  allDay!: boolean;
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
        return {
          googleEvent: formatGoogleEvent(item),
          savedEvent: existingEvent ? existingEvent : null,
        };
      });
      return formattedEvents;
    }
    return [];
  }

  @Query(() => GoogleEvent)
  async getGoogleEvent(
    @Arg("id") id: string,
    @Arg("calendarId") calendarId: string
  ): Promise<GoogleEvent> {
    const calendar = getCalendar();
    const event = (await calendar.events.get({ eventId: id, calendarId })).data;
    return formatGoogleEvent(event);
  }

  @Query(() => CalendarEvent)
  async getSavedEvent(@Arg("id") id: string): Promise<CalendarEvent | null> {
    const dataSource = getDataSource();
    return (await dataSource)
      .getRepository(CalendarEvent)
      .findOne({ where: { id } });
  }

  @Mutation(() => CalendarEvent)
  async saveEvent(
    @Arg("name") name: string,
    @Arg("startDate") startDate: Date,
    @Arg("endDate") endDate: Date,
    @Arg("googleId") googleId: string,
    @Arg("allDay") allDay: boolean,
    @Arg("className", { nullable: true }) className?: string,
    @Arg("tagIds", () => [String], { nullable: true }) tagIds?: string[],
    @Arg("id", { nullable: true }) id?: string
  ) {
    console.log(className);
    const dataSource = await getDataSource();
    let event;
    if (id) {
      event = await dataSource
        .getRepository(CalendarEvent)
        .findOne({ where: { id } });
    }
    if (!event) {
      event = await dataSource.getRepository(CalendarEvent).save(
        dataSource.getRepository(CalendarEvent).create({
          name,
          startDate,
          endDate,
          googleId,
          allDay,
          class: className,
        })
      );
    }

    if (tagIds && tagIds.length > 0) {
      const tags = await dataSource
        .createQueryBuilder(Tag, "tag")
        .where("tag.id IN (:...ids)", { ids: tagIds })
        .getMany();
      event.tags = tags;
    }

    event.name = name;
    event.startDate = startDate;
    event.endDate = endDate;
    event.allDay = allDay;
    event.class = className;

    dataSource.getRepository(CalendarEvent).save(event);

    return event;
  }

  @Query(() => [CalendarEvent])
  async getEvents() {
    const dataSource = await getDataSource();
    return dataSource
      .getRepository(CalendarEvent)
      .find({ relations: { tags: true } });
  }

  @Query(() => [CalendarEvent])
  @UseMiddleware(isAuth)
  async getMyEvents(@Ctx() { payload }: MyContext) {
    const dataSource = await getDataSource();
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id: payload?.userId } });
    const allEvents = await dataSource
      .getRepository(CalendarEvent)
      .find({ relations: { tags: true } });
    const myEvents = allEvents.filter((item) => {
      if (item.class && user && item.class !== user.class) {
        return false;
      } else {
        return true;
      }
    });
    return myEvents;
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const event = await dataSource
      .getRepository(CalendarEvent)
      .findOne({ where: { id } });
    if (event) {
      dataSource.getRepository(CalendarEvent).remove(event);
      return true;
    } else {
      return false;
    }
  }
}
