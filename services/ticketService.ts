import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp
} from 'firebase/firestore';
  import { db } from '@/lib/firebase/client';
  import type { UserProfile } from '@/lib/auth/authTypes';
  import type {
    CreateTicketInput,
    Ticket,
    TicketComment,
    TicketHistoryItem,
    TicketStatus
  } from '@/lib/tickets/ticketTypes';
  
  function toDate(value: unknown): Date | null {
    if (!value) {
      return null;
    }
  
    if (value instanceof Date) {
      return value;
    }
  
    if (typeof value === 'object' && value !== null && 'toDate' in value) {
      return (value as Timestamp).toDate();
    }
  
    return null;
  }

  function getElapsedMinutes(startDate?: Date | null, endDate = new Date()) {
    if (!startDate) {
      return 0;
    }
  
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInMinutes = Math.max(0, Math.round(diffInMilliseconds / 60000));
  
    return diffInMinutes;
  }
  
  async function calculateTicketTimeSpent(ticketId: string) {
    const ticketSnap = await getDoc(doc(db, 'tickets', ticketId));
  
    if (!ticketSnap.exists()) {
      return 0;
    }
  
    const data = ticketSnap.data();
  
    const assignedAt = toDate(data.assignedAt);
    const createdAt = toDate(data.createdAt);
  
    const startDate = assignedAt ?? createdAt;
  
    return getElapsedMinutes(startDate);
  }
  
  function mapTicketDoc(snapshot: QueryDocumentSnapshot<DocumentData>): Ticket {
    const data = snapshot.data();
  
    return {
      id: snapshot.id,
      code: data.code ?? snapshot.id,
  
      title: data.title ?? '',
      description: data.description ?? '',
  
      serviceName: data.serviceName ?? '',
      category: data.category ?? '',
      priority: data.priority ?? 'medium',
      channel: data.channel ?? 'remote',
      city: data.city ?? '',
      preferredSchedule: data.preferredSchedule ?? '',
  
      status: data.status ?? 'new',
  
      clientId: data.clientId ?? '',
      clientName: data.clientName ?? '',
      clientEmail: data.clientEmail ?? '',
  
      technicianId: data.technicianId ?? '',
      technicianName: data.technicianName ?? '',
  
      timeSpentMinutes: data.timeSpentMinutes ?? 0,

      rating: data.rating ?? null,
      ratingComment: data.ratingComment ?? '',
      ratedAt: toDate(data.ratedAt),
      ratedBy: data.ratedBy ?? '',
  
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
      assignedAt: toDate(data.assignedAt),
      closedAt: toDate(data.closedAt)
    };
  }
  
  function createTicketCode() {
    const timestampPart = Date.now().toString().slice(-6);
    return `SRV-${timestampPart}`;
  }
  
  export async function addTicketHistory(params: {
    ticketId: string;
    title: string;
    description: string;
    createdBy?: string;
    createdByName?: string;
  }) {
    await addDoc(collection(db, 'tickets', params.ticketId, 'history'), {
      title: params.title,
      description: params.description,
      createdBy: params.createdBy || 'system',
      createdByName: params.createdByName || 'Sistema',
      createdAt: serverTimestamp()
    });
  }
  
  export async function createTicket(
    input: CreateTicketInput,
    profile: UserProfile
  ) {
    if (profile.role !== 'client') {
      throw new Error('Solo los clientes pueden crear solicitudes.');
    }
  
    const code = createTicketCode();
  
    const ticketRef = await addDoc(collection(db, 'tickets'), {
      code,
  
      title: input.title,
      description: input.description,
  
      serviceName: input.serviceName,
      category: input.category,
      priority: input.priority,
      channel: input.channel,
      city: input.city,
      preferredSchedule: input.preferredSchedule,
  
      status: 'new',
  
      clientId: profile.uid,
      clientName: profile.name,
      clientEmail: profile.email,
  
      technicianId: '',
      technicianName: '',
  
      timeSpentMinutes: 0,

      rating: null,
      ratingComment: '',
      ratedAt: null,
      ratedBy: '',
  
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      assignedAt: null,
      closedAt: null
    });
  
    await addTicketHistory({
      ticketId: ticketRef.id,
      title: 'Solicitud creada',
      description: 'El cliente creó la solicitud desde el portal.',
      createdBy: profile.uid,
      createdByName: profile.name
    });
  
    return {
      ticketId: ticketRef.id,
      code
    };
  }
  
  export async function getClientTickets(clientId: string): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('clientId', '==', clientId)
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.docs
      .map(mapTicketDoc)
      .sort((a, b) => {
        const firstDate = a.createdAt?.getTime() ?? 0;
        const secondDate = b.createdAt?.getTime() ?? 0;
  
        return secondDate - firstDate;
      });
  }
  
  export async function getTicketsByStatus(status: TicketStatus): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('status', '==', status)
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.docs
      .map(mapTicketDoc)
      .sort((a, b) => {
        const firstDate = a.createdAt?.getTime() ?? 0;
        const secondDate = b.createdAt?.getTime() ?? 0;
  
        return secondDate - firstDate;
      });
  }
  
  export async function addTicketComment(params: {
    ticketId: string;
    author: UserProfile;
    message: string;
  }) {
    await addDoc(collection(db, 'tickets', params.ticketId, 'comments'), {
      authorId: params.author.uid,
      authorName: params.author.name,
      authorRole: params.author.role,
      message: params.message,
      createdAt: serverTimestamp()
    });
  
    await updateDoc(doc(db, 'tickets', params.ticketId), {
      updatedAt: serverTimestamp()
    });
  }
  
  export async function updateTicketStatus(params: {
    ticketId: string;
    status: TicketStatus;
    updatedBy: UserProfile;
  }) {
    const payload: Record<string, unknown> = {
      status: params.status,
      updatedAt: serverTimestamp()
    };
  
    if (params.status === 'completed') {
      const timeSpentMinutes = await calculateTicketTimeSpent(params.ticketId);
  
      payload.closedAt = serverTimestamp();
      payload.timeSpentMinutes = timeSpentMinutes;
    }
  
    await updateDoc(doc(db, 'tickets', params.ticketId), payload);
  
    await addTicketHistory({
      ticketId: params.ticketId,
      title: 'Estado actualizado',
      description: `La solicitud cambió al estado ${params.status}.`,
      createdBy: params.updatedBy.uid || 'system',
      createdByName: params.updatedBy.name || 'Sistema'
    });
  }

  export async function getTicketComments(ticketId: string): Promise<TicketComment[]> {
    const commentsQuery = query(
      collection(db, 'tickets', ticketId, 'comments'),
      orderBy('createdAt', 'asc')
    );
  
    const snapshot = await getDocs(commentsQuery);
  
    return snapshot.docs.map((commentDoc) => {
      const data = commentDoc.data();
  
      return {
        id: commentDoc.id,
        authorId: data.authorId ?? '',
        authorName: data.authorName ?? '',
        authorRole: data.authorRole ?? 'client',
        message: data.message ?? '',
        createdAt: toDate(data.createdAt)
      };
    });
  }
  
  export async function getTicketHistory(ticketId: string): Promise<TicketHistoryItem[]> {
    const historyQuery = query(
      collection(db, 'tickets', ticketId, 'history'),
      orderBy('createdAt', 'asc')
    );
  
    const snapshot = await getDocs(historyQuery);
  
    return snapshot.docs.map((historyDoc) => {
      const data = historyDoc.data();
  
      return {
        id: historyDoc.id,
        title: data.title ?? '',
        description: data.description ?? '',
        createdBy: data.createdBy ?? '',
        createdByName: data.createdByName ?? '',
        createdAt: toDate(data.createdAt)
      };
    });
  }

  export async function getNewTickets(): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('status', '==', 'new')
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.docs
      .map(mapTicketDoc)
      .sort((a, b) => {
        const firstDate = a.createdAt?.getTime() ?? 0;
        const secondDate = b.createdAt?.getTime() ?? 0;
  
        return secondDate - firstDate;
      });
  }
  
  export async function getTechnicianTickets(technicianId: string): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('technicianId', '==', technicianId)
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.docs
      .map(mapTicketDoc)
      .sort((a, b) => {
        const firstDate = a.updatedAt?.getTime() ?? 0;
        const secondDate = b.updatedAt?.getTime() ?? 0;
  
        return secondDate - firstDate;
      });
  }
  
  export async function takeTicket(params: {
    ticketId: string;
    technician: UserProfile;
  }) {
    if (params.technician.role !== 'technician') {
      throw new Error('Solo los técnicos pueden tomar tickets.');
    }
  
    await updateDoc(doc(db, 'tickets', params.ticketId), {
      status: 'in_progress',
      technicianId: params.technician.uid,
      technicianName: params.technician.name,
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  
    await addTicketHistory({
      ticketId: params.ticketId,
      title: 'Ticket tomado por técnico',
      description: `${params.technician.name} tomó la solicitud para iniciar la atención.`,
      createdBy: params.technician.uid || 'technician',
      createdByName: params.technician.name || 'Técnico'
    });
  }
  
  export async function completeTicket(params: {
    ticketId: string;
    technician: UserProfile;
  }) {
    if (params.technician.role !== 'technician') {
      throw new Error('Solo los técnicos pueden finalizar tickets.');
    }
  
    const timeSpentMinutes = await calculateTicketTimeSpent(params.ticketId);
  
    await updateDoc(doc(db, 'tickets', params.ticketId), {
      status: 'completed',
      closedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      timeSpentMinutes
    });
  
    await addTicketHistory({
      ticketId: params.ticketId,
      title: 'Solicitud finalizada',
      description: `${params.technician.name || 'Técnico'} marcó la solicitud como finalizada.`,
      createdBy: params.technician.uid || 'technician',
      createdByName: params.technician.name || 'Técnico'
    });
  }

  export async function getAllTickets(): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, 'tickets')
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.docs
      .map(mapTicketDoc)
      .sort((a, b) => {
        const firstDate = a.updatedAt?.getTime() ?? 0;
        const secondDate = b.updatedAt?.getTime() ?? 0;
  
        return secondDate - firstDate;
      });
  }
  
  export async function assignTicketToTechnician(params: {
    ticketId: string;
    technicianId: string;
    technicianName: string;
    assignedBy: UserProfile;
  }) {
    if (params.assignedBy.role !== 'admin') {
      throw new Error('Solo los administradores pueden asignar tickets.');
    }
  
    await updateDoc(doc(db, 'tickets', params.ticketId), {
      status: 'assigned',
      technicianId: params.technicianId,
      technicianName: params.technicianName,
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  
    await addTicketHistory({
      ticketId: params.ticketId,
      title: 'Técnico asignado',
      description: `${params.assignedBy.name} asignó la solicitud a ${params.technicianName}.`,
      createdBy: params.assignedBy.uid || 'admin',
      createdByName: params.assignedBy.name || 'Administrador'
    });
  }

  function getStartOfToday() {
    const date = new Date();
  
    date.setHours(0, 0, 0, 0);
  
    return date;
  }
  
  function getStartOfTomorrow() {
    const date = new Date();
  
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
  
    return date;
  }
  
  function getDateNDaysAgo(days: number) {
    const date = new Date();
  
    date.setDate(date.getDate() - days);
    date.setHours(0, 0, 0, 0);
  
    return date;
  }
  
  export async function getTodayTicketsCount() {
    const startOfToday = getStartOfToday();
    const startOfTomorrow = getStartOfTomorrow();
  
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('createdAt', '>=', startOfToday),
      where('createdAt', '<', startOfTomorrow)
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    return snapshot.size;
  }
  
  export async function getAverageDailyTickets(days = 7) {
    const startDate = getDateNDaysAgo(days);
  
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('createdAt', '>=', startDate)
    );
  
    const snapshot = await getDocs(ticketsQuery);
  
    if (days <= 0) {
      return 0;
    }
  
    return Math.round(snapshot.size / days);
  }

  export async function rateTicket(params: {
    ticketId: string;
    rating: number;
    ratingComment?: string;
    client: UserProfile;
  }) {
    if (params.client.role !== 'client') {
      throw new Error('Solo los clientes pueden calificar solicitudes.');
    }
  
    if (params.rating < 1 || params.rating > 5) {
      throw new Error('La calificación debe estar entre 1 y 5.');
    }
  
    const ticketSnap = await getDoc(doc(db, 'tickets', params.ticketId));
  
    if (!ticketSnap.exists()) {
      throw new Error('La solicitud no existe.');
    }
  
    const ticketData = ticketSnap.data();
  
    if (ticketData.clientId !== params.client.uid) {
      throw new Error('No puedes calificar una solicitud de otro cliente.');
    }
  
    if (ticketData.status !== 'completed') {
      throw new Error('Solo puedes calificar solicitudes finalizadas.');
    }
  
    if (ticketData.rating) {
      throw new Error('Esta solicitud ya fue calificada.');
    }
  
    await updateDoc(doc(db, 'tickets', params.ticketId), {
      rating: params.rating,
      ratingComment: params.ratingComment ?? '',
      ratedAt: serverTimestamp(),
      ratedBy: params.client.uid,
      updatedAt: serverTimestamp()
    });
  
    await addTicketHistory({
      ticketId: params.ticketId,
      title: 'Solicitud calificada',
      description: `${params.client.name || 'Cliente'} calificó la atención con ${params.rating} de 5.`,
      createdBy: params.client.uid || 'client',
      createdByName: params.client.name || 'Cliente'
    });
  }

  export function calculateAverageRating(tickets: Ticket[]) {
    const ratedTickets = tickets.filter(
      (ticket) => typeof ticket.rating === 'number' && ticket.rating > 0
    );
  
    if (ratedTickets.length === 0) {
      return 'Sin calificar';
    }
  
    const totalRating = ratedTickets.reduce(
      (total, ticket) => total + (ticket.rating ?? 0),
      0
    );
  
    return (totalRating / ratedTickets.length).toFixed(1);
  }
  
  export function calculateTechnicianAverageRating(
    tickets: Ticket[],
    technicianId: string
  ) {
    const technicianTickets = tickets.filter(
      (ticket) =>
        ticket.technicianId === technicianId &&
        typeof ticket.rating === 'number' &&
        ticket.rating > 0
    );
  
    if (technicianTickets.length === 0) {
      return 'Sin calificar';
    }
  
    const totalRating = technicianTickets.reduce(
      (total, ticket) => total + (ticket.rating ?? 0),
      0
    );
  
    return (totalRating / technicianTickets.length).toFixed(1);
  }