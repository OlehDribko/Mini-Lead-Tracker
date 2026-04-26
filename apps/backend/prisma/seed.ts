import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { LeadStatus, PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.comment.deleteMany();
  await prisma.lead.deleteMany();

  const seedLeads = [
    {
      name: 'Alice Johnson',
      email: 'alice@acme.com',
      company: 'Acme Corp',
      status: LeadStatus.NEW,
      value: 3200,
      notes: 'Requested pricing details.',
    },
    {
      name: 'Bob Miller',
      email: 'bob@northstar.io',
      company: 'Northstar IO',
      status: LeadStatus.CONTACTED,
      value: 5400,
      notes: 'Intro call completed.',
    },
    {
      name: 'Carla Gomez',
      email: 'carla@novaworks.dev',
      company: 'NovaWorks',
      status: LeadStatus.IN_PROGRESS,
      value: 9000,
      notes: 'Waiting for technical confirmation.',
    },
    {
      name: 'Daniel Reed',
      email: 'daniel@brightlane.co',
      company: 'BrightLane',
      status: LeadStatus.WON,
      value: 12500,
      notes: 'Contract signed.',
    },
    {
      name: 'Eva Novak',
      email: 'eva@skyhub.app',
      company: 'SkyHub',
      status: LeadStatus.LOST,
      value: 4300,
      notes: 'Chose a competitor.',
    },
    {
      name: 'Farid Khan',
      email: 'farid@orbitlabs.ai',
      company: 'OrbitLabs',
      status: LeadStatus.NEW,
      value: 6100,
      notes: 'Inbound lead from website.',
    },
    {
      name: 'Grace Lee',
      email: 'grace@hexahealth.com',
      company: 'HexaHealth',
      status: LeadStatus.CONTACTED,
      value: 7800,
      notes: 'Follow-up email sent.',
    },
  ];

  const createdLeads = await Promise.all(
    seedLeads.map((lead) => prisma.lead.create({ data: lead })),
  );

  await prisma.comment.createMany({
    data: [
      {
        leadId: createdLeads[0].id,
        text: 'Sent initial deck and pricing options.',
      },
      {
        leadId: createdLeads[1].id,
        text: 'Client asked for implementation timeline.',
      },
      {
        leadId: createdLeads[2].id,
        text: 'Scheduled product demo for next Tuesday.',
      },
      {
        leadId: createdLeads[2].id,
        text: 'Demo completed, preparing follow-up proposal.',
      },
      {
        leadId: createdLeads[3].id,
        text: 'Onboarding kickoff completed successfully.',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
